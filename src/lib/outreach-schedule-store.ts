import fs from 'node:fs';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';
import { isDbConfigured } from '@/lib/db';
import { OutreachContact, getAllOutreachContacts } from '@/lib/outreach-store';
import { createOutreachTransporter, sendSingleOutreachMail } from '@/lib/outreach-mailer';
import {
    computeNextCountryLocalSchedule,
    formatDateInZoneTr,
    resolveCountryTimezone,
} from '@/lib/outreach-timezone';

export type ScheduledJobStatus = 'pending' | 'sending' | 'sent' | 'failed' | 'cancelled';

export interface ScheduledOutreachJob {
    id: string;
    contactId: number;
    contactName: string;
    email: string;
    country: string;
    countryNameTr: string;
    countryCode: string;
    flag: string;
    group: 'business' | 'alevi';
    category: string;
    timeZone: string;
    lang: 'tr' | 'en';
    customSubject?: string;
    isTest: boolean;
    testEmail: string;
    targetLocalTime: string;
    skipWeekends: boolean;
    recipientLocalLabel: string;
    turkeyLocalLabel: string;
    scheduledAtUtc: string;
    createdAtUtc: string;
    status: ScheduledJobStatus;
    sentAtUtc?: string;
    error?: string;
}

declare global {
    var __ataYapiOutreachSchedules: ScheduledOutreachJob[] | undefined;
    var __ataYapiOutreachScheduleTimerStarted: boolean | undefined;
    var __ataYapiOutreachScheduleProcessing: boolean | undefined;
    var __ataYapiOutreachScheduleDbReady: boolean | undefined;
}

const LOCAL_DATA_FILE = path.join(process.cwd(), '.data', 'outreach-schedules.json');

function loadFromDiskOrMemory(): ScheduledOutreachJob[] {
    if (global.__ataYapiOutreachSchedules) {
        return global.__ataYapiOutreachSchedules;
    }

    try {
        if (fs.existsSync(LOCAL_DATA_FILE)) {
            const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                global.__ataYapiOutreachSchedules = parsed as ScheduledOutreachJob[];
                return global.__ataYapiOutreachSchedules;
            }
        }
    } catch {
        // Ignore disk read error on read-only environments
    }

    global.__ataYapiOutreachSchedules = [];
    return global.__ataYapiOutreachSchedules;
}

function saveToDiskAndMemory(jobs: ScheduledOutreachJob[]) {
    global.__ataYapiOutreachSchedules = jobs;
    try {
        const dir = path.dirname(LOCAL_DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(jobs, null, 2), 'utf-8');
    } catch {
        // Read-only filesystem (e.g. serverless); memory/DB handles persistence
    }
}

async function ensureDbTable() {
    if (!isDbConfigured() || global.__ataYapiOutreachScheduleDbReady) return;
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
        CREATE TABLE IF NOT EXISTS outreach_schedules (
            id TEXT PRIMARY KEY,
            status TEXT NOT NULL,
            scheduled_at_utc TIMESTAMPTZ NOT NULL,
            payload JSONB NOT NULL,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `;
    global.__ataYapiOutreachScheduleDbReady = true;
}

async function readAllJobs(): Promise<ScheduledOutreachJob[]> {
    if (isDbConfigured()) {
        try {
            await ensureDbTable();
            const sql = neon(process.env.DATABASE_URL!);
            const rows = await sql`
                SELECT payload
                FROM outreach_schedules
                ORDER BY scheduled_at_utc ASC
                LIMIT 500
            `;
            const jobs: ScheduledOutreachJob[] = [];
            for (const row of rows) {
                const payload = (row as { payload?: unknown }).payload;
                if (payload && typeof payload === 'object') {
                    jobs.push(payload as ScheduledOutreachJob);
                } else if (typeof payload === 'string') {
                    jobs.push(JSON.parse(payload) as ScheduledOutreachJob);
                }
            }
            global.__ataYapiOutreachSchedules = jobs;
            return jobs;
        } catch (err) {
            console.warn('[outreach-schedule-store] Neon DB read fallback to local store:', err);
        }
    }

    return [...loadFromDiskOrMemory()].sort((a, b) =>
        a.scheduledAtUtc.localeCompare(b.scheduledAtUtc)
    );
}

async function upsertJob(job: ScheduledOutreachJob): Promise<void> {
    if (isDbConfigured()) {
        try {
            await ensureDbTable();
            const sql = neon(process.env.DATABASE_URL!);
            const jsonPayload = JSON.stringify(job);
            await sql`
                INSERT INTO outreach_schedules (id, status, scheduled_at_utc, payload, updated_at)
                VALUES (${job.id}, ${job.status}, ${job.scheduledAtUtc}::timestamptz, ${jsonPayload}::jsonb, NOW())
                ON CONFLICT (id) DO UPDATE SET
                    status = EXCLUDED.status,
                    scheduled_at_utc = EXCLUDED.scheduled_at_utc,
                    payload = EXCLUDED.payload,
                    updated_at = NOW()
            `;
        } catch (err) {
            console.warn('[outreach-schedule-store] Neon DB upsert fallback to local store:', err);
        }
    }

    const current = loadFromDiskOrMemory();
    const idx = current.findIndex((item) => item.id === job.id);
    if (idx >= 0) {
        current[idx] = job;
    } else {
        current.push(job);
    }
    saveToDiskAndMemory(current);
}

async function deleteJobsByIds(ids: string[]): Promise<void> {
    if (ids.length === 0) return;

    if (isDbConfigured()) {
        try {
            await ensureDbTable();
            const sql = neon(process.env.DATABASE_URL!);
            for (const id of ids) {
                await sql`DELETE FROM outreach_schedules WHERE id = ${id}`;
            }
        } catch (err) {
            console.warn('[outreach-schedule-store] Neon DB delete fallback:', err);
        }
    }

    const idSet = new Set(ids);
    const remaining = loadFromDiskOrMemory().filter((item) => !idSet.has(item.id));
    saveToDiskAndMemory(remaining);
}

export function ensureOutreachBackgroundScheduler() {
    if (
        global.__ataYapiOutreachScheduleTimerStarted ||
        process.env.NEXT_PHASE === 'phase-production-build'
    ) {
        return;
    }

    global.__ataYapiOutreachScheduleTimerStarted = true;
    const timer = setInterval(() => {
        void processDueScheduledOutreachJobs().catch((err) => {
            console.error('[outreach-schedule-store] Background tick error:', err);
        });
    }, 20_000);

    if (typeof timer === 'object' && timer !== null && 'unref' in timer && typeof timer.unref === 'function') {
        timer.unref();
    }
}

export interface CreateScheduleBatchInput {
    contacts: OutreachContact[];
    lang: 'tr' | 'en';
    customSubject?: string;
    isTest?: boolean;
    testEmail?: string;
    targetLocalTime?: string;
    skipWeekends?: boolean;
    /** Optional explicit ISO UTC override if user picked an exact custom date/time */
    customUtcIso?: string;
}

export async function scheduleOutreachEmails({
    contacts,
    lang,
    customSubject,
    isTest = false,
    testEmail = 'atayapicambalkon@gmail.com',
    targetLocalTime = '09:00',
    skipWeekends = true,
    customUtcIso,
}: CreateScheduleBatchInput): Promise<ScheduledOutreachJob[]> {
    ensureOutreachBackgroundScheduler();

    const existingJobs = await readAllJobs();
    const createdOrUpdated: ScheduledOutreachJob[] = [];
    const now = new Date();
    const safeLang: 'tr' | 'en' = lang === 'en' ? 'en' : 'tr';

    // Track per-timezone count so same-timezone contacts stagger gently by 12s (09:00:00, 09:00:12, ...)
    const perTimezoneCount: Record<string, number> = {};

    for (const contact of contacts) {
        const tzMeta = resolveCountryTimezone(contact.countryCode, contact.email);
        const tzIndex = perTimezoneCount[tzMeta.timeZone] || 0;
        perTimezoneCount[tzMeta.timeZone] = tzIndex + 1;

        let scheduledAtUtc: Date;
        let recipientLocalLabel: string;
        let turkeyLocalLabel: string;
        let finalTargetLocalTime = targetLocalTime;

        if (customUtcIso && !Number.isNaN(new Date(customUtcIso).getTime())) {
            const baseDate = new Date(customUtcIso);
            scheduledAtUtc = new Date(baseDate.getTime() + tzIndex * 12_000);
            recipientLocalLabel = formatDateInZoneTr(scheduledAtUtc, tzMeta.timeZone);
            turkeyLocalLabel = formatDateInZoneTr(scheduledAtUtc, 'Europe/Istanbul');
        } else {
            const computed = computeNextCountryLocalSchedule(contact.countryCode, {
                email: contact.email,
                targetLocalTime,
                skipWeekends,
                staggerIndex: tzIndex,
                staggerSeconds: 12,
                now,
            });
            scheduledAtUtc = computed.scheduledAtUtc;
            recipientLocalLabel = computed.recipientLocalLabel;
            turkeyLocalLabel = computed.turkeyLocalLabel;
            finalTargetLocalTime = computed.targetLocalTime;
        }

        // Replace existing pending job for the same contact & mode so we don't duplicate
        const existingPending = existingJobs.find(
            (j) => j.contactId === contact.id && j.status === 'pending' && j.isTest === isTest
        );

        const job: ScheduledOutreachJob = {
            id:
                existingPending?.id ||
                `sched_${Date.now()}_${contact.id}_${Math.random().toString(36).slice(2, 7)}`,
            contactId: contact.id,
            contactName: contact.name,
            email: contact.email,
            country: contact.country,
            countryNameTr: tzMeta.nameTr,
            countryCode: contact.countryCode,
            flag: tzMeta.flag,
            group: contact.group,
            category: contact.category || 'Yapı Sistemleri',
            timeZone: tzMeta.timeZone,
            lang: safeLang,
            customSubject: customSubject?.trim() || undefined,
            isTest,
            testEmail,
            targetLocalTime: finalTargetLocalTime,
            skipWeekends,
            recipientLocalLabel,
            turkeyLocalLabel,
            scheduledAtUtc: scheduledAtUtc.toISOString(),
            createdAtUtc: now.toISOString(),
            status: 'pending',
        };

        await upsertJob(job);
        createdOrUpdated.push(job);
    }

    return createdOrUpdated;
}

export async function processDueScheduledOutreachJobs(options?: {
    forceJobId?: string;
}): Promise<{ processed: number; sent: number; failed: number }> {
    ensureOutreachBackgroundScheduler();

    if (global.__ataYapiOutreachScheduleProcessing && !options?.forceJobId) {
        return { processed: 0, sent: 0, failed: 0 };
    }

    global.__ataYapiOutreachScheduleProcessing = true;
    let processed = 0;
    let sent = 0;
    let failed = 0;

    try {
        const allJobs = await readAllJobs();
        const nowMs = Date.now();
        const dueJobs = allJobs.filter((job) => {
            if (options?.forceJobId) {
                return job.id === options.forceJobId && (job.status === 'pending' || job.status === 'failed');
            }
            return job.status === 'pending' && new Date(job.scheduledAtUtc).getTime() <= nowMs;
        });

        if (dueJobs.length === 0) {
            return { processed: 0, sent: 0, failed: 0 };
        }

        const transporter = createOutreachTransporter();
        const liveContacts = getAllOutreachContacts();

        for (const job of dueJobs) {
            processed++;
            const sendingJob: ScheduledOutreachJob = { ...job, status: 'sending' };
            await upsertJob(sendingJob);

            const liveContact = liveContacts.find((c) => c.id === job.contactId);
            const contactPayload = liveContact || {
                id: job.contactId,
                name: job.contactName,
                email: job.email,
                country: job.country,
                group: job.group,
                category: job.category,
            };

            const res = await sendSingleOutreachMail({
                contact: contactPayload,
                lang: job.lang,
                customSubject: job.customSubject,
                isTest: job.isTest,
                testEmail: job.testEmail,
                transporter,
            });

            if (res.success) {
                sent++;
                await upsertJob({
                    ...sendingJob,
                    status: 'sent',
                    sentAtUtc: new Date().toISOString(),
                    error: undefined,
                });
            } else {
                failed++;
                await upsertJob({
                    ...sendingJob,
                    status: 'failed',
                    error: res.error || 'SMTP gönderim hatası',
                });
            }

            if (dueJobs.length > 1) {
                await new Promise((resolve) => setTimeout(resolve, 650));
            }
        }

        return { processed, sent, failed };
    } finally {
        global.__ataYapiOutreachScheduleProcessing = false;
    }
}

export async function listScheduledOutreachJobs(): Promise<ScheduledOutreachJob[]> {
    ensureOutreachBackgroundScheduler();
    await processDueScheduledOutreachJobs();
    const jobs = await readAllJobs();
    return jobs.sort((a, b) => {
        // Pending/sending first ordered by upcoming scheduledAtUtc, then recent completed
        const aActive = a.status === 'pending' || a.status === 'sending' ? 0 : 1;
        const bActive = b.status === 'pending' || b.status === 'sending' ? 0 : 1;
        if (aActive !== bActive) return aActive - bActive;
        if (aActive === 0) return a.scheduledAtUtc.localeCompare(b.scheduledAtUtc);
        return (b.sentAtUtc || b.createdAtUtc).localeCompare(a.sentAtUtc || a.createdAtUtc);
    });
}

export async function cancelScheduledOutreachJob(id: string): Promise<boolean> {
    const jobs = await readAllJobs();
    const target = jobs.find((j) => j.id === id);
    if (!target) return false;
    if (target.status === 'pending') {
        await deleteJobsByIds([id]);
        return true;
    }
    await deleteJobsByIds([id]);
    return true;
}

export async function cancelAllPendingScheduledJobs(): Promise<number> {
    const jobs = await readAllJobs();
    const pendingIds = jobs.filter((j) => j.status === 'pending').map((j) => j.id);
    await deleteJobsByIds(pendingIds);
    return pendingIds.length;
}

export async function clearHistoryScheduledJobs(): Promise<number> {
    const jobs = await readAllJobs();
    const finishedIds = jobs
        .filter((j) => j.status === 'sent' || j.status === 'failed' || j.status === 'cancelled')
        .map((j) => j.id);
    await deleteJobsByIds(finishedIds);
    return finishedIds.length;
}

