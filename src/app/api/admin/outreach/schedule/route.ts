import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { OutreachContact, getAllOutreachContacts } from '@/lib/outreach-store';
import {
    cancelAllPendingScheduledJobs,
    cancelScheduledOutreachJob,
    clearHistoryScheduledJobs,
    listScheduledOutreachJobs,
    processDueScheduledOutreachJobs,
    scheduleOutreachEmails,
} from '@/lib/outreach-schedule-store';

export async function GET(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const jobs = await listScheduledOutreachJobs();
        const pendingCount = jobs.filter((j) => j.status === 'pending' || j.status === 'sending').length;
        const sentCount = jobs.filter((j) => j.status === 'sent').length;
        const failedCount = jobs.filter((j) => j.status === 'failed').length;

        return NextResponse.json({
            success: true,
            serverNowUtc: new Date().toISOString(),
            summary: {
                total: jobs.length,
                pending: pendingCount,
                sent: sentCount,
                failed: failedCount,
            },
            jobs,
        });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Zamanlanmış liste alınamadı.';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const body = await request.json();

        if (body.action === 'send_now' && typeof body.jobId === 'string') {
            const result = await processDueScheduledOutreachJobs({ forceJobId: body.jobId });
            const jobs = await listScheduledOutreachJobs();
            return NextResponse.json({
                success: result.sent > 0,
                result,
                jobs,
                message:
                    result.sent > 0
                        ? 'Zamanlanmış e-posta hemen gönderildi.'
                        : 'Gönderim sırasında hata oluştu veya kayıt bulunamadı.',
            });
        }

        if (body.action === 'process_due') {
            const result = await processDueScheduledOutreachJobs();
            const jobs = await listScheduledOutreachJobs();
            return NextResponse.json({
                success: true,
                result,
                jobs,
            });
        }

        const {
            contactId,
            contactIds,
            sendAll = false,
            lang = 'tr',
            customSubject,
            isTest = false,
            testEmail = 'atayapicambalkon@gmail.com',
            targetLocalTime = '09:00',
            skipWeekends = true,
            customUtcIso,
        } = body;

        const allContacts = getAllOutreachContacts();
        let targets: OutreachContact[] = [];

        if (sendAll) {
            targets = allContacts;
        } else if (Array.isArray(contactIds) && contactIds.length > 0) {
            targets = allContacts.filter((c) => contactIds.includes(c.id));
        } else if (contactId) {
            const found = allContacts.find((c) => c.id === Number(contactId));
            if (!found) {
                return NextResponse.json({ success: false, error: 'Firma bulunamadı.' }, { status: 404 });
            }
            targets = [found];
        } else {
            return NextResponse.json(
                { success: false, error: 'Zamanlanacak hedef firma belirtilmedi.' },
                { status: 400 }
            );
        }

        const safeLang: 'tr' | 'en' = lang === 'en' ? 'en' : 'tr';
        const scheduledJobs = await scheduleOutreachEmails({
            contacts: targets,
            lang: safeLang,
            customSubject: typeof customSubject === 'string' ? customSubject : undefined,
            isTest: Boolean(isTest),
            testEmail: String(testEmail || 'atayapicambalkon@gmail.com'),
            targetLocalTime: String(targetLocalTime || '09:00'),
            skipWeekends: Boolean(skipWeekends),
            customUtcIso: typeof customUtcIso === 'string' && customUtcIso ? customUtcIso : undefined,
        });

        const jobs = await listScheduledOutreachJobs();

        return NextResponse.json({
            success: true,
            scheduledCount: scheduledJobs.length,
            scheduledJobs,
            jobs,
            message:
                scheduledJobs.length === 1
                    ? `${scheduledJobs[0].contactName} için e-posta ${scheduledJobs[0].countryNameTr} yerel saatiyle ${scheduledJobs[0].recipientLocalLabel} (TR saati: ${scheduledJobs[0].turkeyLocalLabel}) olarak zamanlandı.`
                    : `${scheduledJobs.length} firma kendi ülkelerinin yerel saatiyle (${targetLocalTime}) otomatik gönderilmek üzere zamanlandı.`,
        });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Zamanlama sırasında bir hata oluştu.';
        console.error('Outreach schedule POST error:', error);
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const scope = searchParams.get('scope');

        if (scope === 'pending') {
            const count = await cancelAllPendingScheduledJobs();
            const jobs = await listScheduledOutreachJobs();
            return NextResponse.json({
                success: true,
                removedCount: count,
                jobs,
                message: `${count} bekleyen zamanlanmış gönderim iptal edildi.`,
            });
        }

        if (scope === 'history') {
            const count = await clearHistoryScheduledJobs();
            const jobs = await listScheduledOutreachJobs();
            return NextResponse.json({
                success: true,
                removedCount: count,
                jobs,
                message: `${count} tamamlanmış kayıt geçmişten temizlendi.`,
            });
        }

        if (!id) {
            return NextResponse.json({ success: false, error: 'Silinecek zamanlama ID belirtilmedi.' }, { status: 400 });
        }

        const ok = await cancelScheduledOutreachJob(id);
        const jobs = await listScheduledOutreachJobs();

        return NextResponse.json({
            success: ok,
            jobs,
            message: ok ? 'Zamanlanmış e-posta iptal edildi.' : 'Kayıt bulunamadı.',
        });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'İptal işlemi sırasında hata oluştu.';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}

