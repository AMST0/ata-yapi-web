"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { OutreachContact } from "@/app/api/admin/outreach/route";
import {
    getEmailSubject,
    getEmailHtml,
} from "@/lib/outreach-templates";
import {
    COUNTRY_TIMEZONES,
    computeNextCountryLocalSchedule,
} from "@/lib/outreach-timezone";
import type { ScheduledOutreachJob } from "@/lib/outreach-schedule-store";

interface SenderInfo {
    email: string;
    name: string;
    whatsapp: string;
    website: string;
    smtpServer: string;
}

const COUNTRY_OPTIONS = Object.values(COUNTRY_TIMEZONES).map((meta) => ({
    code: meta.code,
    label: `${meta.flag} ${meta.nameTr} (${meta.code}) — ${meta.cityTr}`,
}));

function formatRemainingCountdown(scheduledAtUtc: string, nowMs: number): string {
    const diffMs = new Date(scheduledAtUtc).getTime() - nowMs;
    if (diffMs <= 0) return "Gönderim zamanı geldi";
    const totalMinutes = Math.ceil(diffMs / 60_000);
    if (totalMinutes < 60) {
        return `${totalMinutes} dk sonra`;
    }
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours < 24) {
        return mins > 0 ? `${hours} sa ${mins} dk sonra` : `${hours} saat sonra`;
    }
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return remHours > 0 ? `${days} gün ${remHours} sa sonra` : `${days} gün sonra`;
}

export default function AdminOutreachPage() {
    const [contacts, setContacts] = useState<OutreachContact[]>([]);
    const [sender, setSender] = useState<SenderInfo | null>(null);
    const [scheduledJobs, setScheduledJobs] = useState<ScheduledOutreachJob[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("ALL");
    const [nowMs, setNowMs] = useState<number>(() => Date.now());

    // Single Preview, Send & Schedule Modal state
    const [previewContact, setPreviewContact] = useState<OutreachContact | null>(null);
    const [previewLang, setPreviewLang] = useState<"tr" | "en">("tr");
    const [customSubject, setCustomSubject] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [isSchedulingSingle, setIsSchedulingSingle] = useState(false);
    const [singleTargetTime, setSingleTargetTime] = useState<string>("09:00");
    const [singleSkipWeekends, setSingleSkipWeekends] = useState<boolean>(true);
    const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
    const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null);
    const [isTestMode, setIsTestMode] = useState(false);

    // Add New Contact Modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCompany, setNewCompany] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newCountryCode, setNewCountryCode] = useState("DE");
    const [newCategory, setNewCategory] = useState("Pencere, Cam Balkon & Sineklik Sistemleri");
    const [newGroup, setNewGroup] = useState<"business" | "alevi">("business");
    const [addError, setAddError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Multi-selection & Bulk Send / Bulk Schedule state
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [bulkMode, setBulkMode] = useState<"schedule_country" | "immediate">("schedule_country");
    const [bulkLang, setBulkLang] = useState<"tr" | "en">("en");
    const [bulkTargetTime, setBulkTargetTime] = useState<string>("09:00");
    const [bulkSkipWeekends, setBulkSkipWeekends] = useState<boolean>(true);
    const [bulkIsTest, setBulkIsTest] = useState(false);
    const [bulkSending, setBulkSending] = useState(false);
    const [bulkProgress, setBulkProgress] = useState<{ total: number; sent: number; current: string } | null>(null);
    const [bulkResult, setBulkResult] = useState<{
        mode: "schedule_country" | "immediate";
        successful: number;
        failed: number;
        message?: string;
    } | null>(null);

    // Queue actions loading state
    const [activeQueueActionId, setActiveQueueActionId] = useState<string | null>(null);

    // Copy notifications
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);

    const fetchOutreachAndSchedules = useCallback(async () => {
        try {
            const [outreachRes, scheduleRes] = await Promise.all([
                fetch("/api/admin/outreach", { cache: "no-store" }),
                fetch("/api/admin/outreach/schedule", { cache: "no-store" }),
            ]);

            if (outreachRes.ok) {
                const data = await outreachRes.json();
                setContacts(data.contacts || []);
                setSender(data.sender || null);
            }

            if (scheduleRes.ok) {
                const schedData = await scheduleRes.json();
                setScheduledJobs(schedData.jobs || []);
            }
        } catch (err) {
            console.error("Error fetching outreach data:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchOutreachAndSchedules();
    }, [fetchOutreachAndSchedules]);

    // Periodic clock refresh & background queue check every 20 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setNowMs(Date.now());
            void fetchOutreachAndSchedules();
        }, 20_000);
        return () => clearInterval(interval);
    }, [fetchOutreachAndSchedules]);

    const pendingJobByContactId = useMemo(() => {
        const map = new Map<number, ScheduledOutreachJob>();
        for (const job of scheduledJobs) {
            if ((job.status === "pending" || job.status === "sending") && !job.isTest) {
                map.set(job.contactId, job);
            }
        }
        return map;
    }, [scheduledJobs]);

    const pendingJobsCount = useMemo(
        () => scheduledJobs.filter((j) => j.status === "pending" || j.status === "sending").length,
        [scheduledJobs]
    );

    const singleSchedulePreview = useMemo(() => {
        if (!previewContact) return null;
        return computeNextCountryLocalSchedule(previewContact.countryCode, {
            email: previewContact.email,
            targetLocalTime: singleTargetTime,
            skipWeekends: singleSkipWeekends,
            now: new Date(nowMs),
        });
    }, [previewContact, singleTargetTime, singleSkipWeekends, nowMs]);

    const bulkCountryBreakdown = useMemo(() => {
        const chosen =
            selectedIds.length > 0
                ? contacts.filter((c) => selectedIds.includes(c.id))
                : contacts;
        const grouped = new Map<
            string,
            {
                key: string;
                flags: Set<string>;
                countriesTr: Set<string>;
                count: number;
                recipientLocalLabel: string;
                turkeyLocalLabel: string;
                scheduledAtIso: string;
            }
        >();

        const refNow = new Date(nowMs);
        for (const c of chosen) {
            const sched = computeNextCountryLocalSchedule(c.countryCode, {
                email: c.email,
                targetLocalTime: bulkTargetTime,
                skipWeekends: bulkSkipWeekends,
                now: refNow,
            });
            const existing = grouped.get(sched.timeZone);
            if (existing) {
                existing.count += 1;
                existing.flags.add(sched.flag);
                existing.countriesTr.add(sched.countryNameTr);
            } else {
                grouped.set(sched.timeZone, {
                    key: sched.timeZone,
                    flags: new Set([sched.flag]),
                    countriesTr: new Set([sched.countryNameTr]),
                    count: 1,
                    recipientLocalLabel: sched.recipientLocalLabel,
                    turkeyLocalLabel: sched.turkeyLocalLabel,
                    scheduledAtIso: sched.scheduledAtIso,
                });
            }
        }

        return Array.from(grouped.values()).sort((a, b) =>
            a.scheduledAtIso.localeCompare(b.scheduledAtIso)
        );
    }, [contacts, selectedIds, bulkTargetTime, bulkSkipWeekends, nowMs]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedEmail(text);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    const filterCountryOptions = [
        { key: "ALL", label: "Tümü", count: contacts.length },
        { key: "DE", label: "Almanya (DE)", count: contacts.filter((c) => c.countryCode === "DE").length },
        { key: "BE", label: "Belçika (BE)", count: contacts.filter((c) => c.countryCode === "BE").length },
        { key: "DACH", label: "Avusturya & İsviçre", count: contacts.filter((c) => c.countryCode === "AT" || c.countryCode === "CH").length },
        { key: "NL", label: "Hollanda (NL)", count: contacts.filter((c) => c.countryCode === "NL").length },
        { key: "MED", label: "Portekiz & Yunanistan", count: contacts.filter((c) => c.countryCode === "PT" || c.countryCode === "GR").length },
        { key: "ALEVI", label: "Kurum & Topluluk", count: contacts.filter((c) => c.group === "alevi").length },
    ];

    const filteredContacts = contacts.filter((c) => {
        if (selectedCountryFilter === "DE" && c.countryCode !== "DE") return false;
        if (selectedCountryFilter === "BE" && c.countryCode !== "BE") return false;
        if (selectedCountryFilter === "DACH" && c.countryCode !== "AT" && c.countryCode !== "CH") return false;
        if (selectedCountryFilter === "NL" && c.countryCode !== "NL") return false;
        if (selectedCountryFilter === "MED" && c.countryCode !== "PT" && c.countryCode !== "GR") return false;
        if (selectedCountryFilter === "ALEVI" && c.group !== "alevi") return false;

        if (searchTerm.trim() !== "") {
            const query = searchTerm.toLowerCase();
            return (
                c.name.toLowerCase().includes(query) ||
                c.email.toLowerCase().includes(query) ||
                c.country.toLowerCase().includes(query) ||
                (c.category || "").toLowerCase().includes(query)
            );
        }

        return true;
    });

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredContacts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredContacts.map((c) => c.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const copyAllEmails = () => {
        const emails = filteredContacts.map((c) => c.email).join(", ");
        navigator.clipboard.writeText(emails);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2500);
    };

    const downloadCsv = () => {
        const header = "Firma,E-posta,Grup,Ulke,Kategori,Dil,Durum\n";
        const rows = filteredContacts
            .map((c) => `"${c.name}","${c.email}","${c.group}","${c.country}","${c.category}","${c.language}","${c.status}"`)
            .join("\n");
        const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ata_yapi_ihracat_mailler_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const openPreviewModal = (contact: OutreachContact) => {
        const initialLang: "tr" | "en" =
            contact.countryCode === "TR" || contact.group === "alevi" ? "tr" : "en";
        setPreviewContact(contact);
        setPreviewLang(initialLang);
        setCustomSubject(getEmailSubject(contact, initialLang));
        setSingleTargetTime("09:00");
        setSendSuccessMessage(null);
        setSendErrorMessage(null);
        setNowMs(Date.now());
    };

    const handlePreviewLangChange = (lang: "tr" | "en") => {
        setPreviewLang(lang);
        if (previewContact) {
            setCustomSubject(getEmailSubject(previewContact, lang));
        }
    };

    const handleAddContact = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddError(null);
        setIsAdding(true);

        try {
            const res = await fetch("/api/admin/outreach", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newCompany,
                    email: newEmail,
                    countryCode: newCountryCode,
                    category: newCategory,
                    group: newGroup,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setNewCompany("");
                setNewEmail("");
                setIsAddModalOpen(false);
                await fetchOutreachAndSchedules();
                window.dispatchEvent(new Event("admin-counts-updated"));
            } else {
                setAddError(data.error || "Firma eklenemedi.");
            }
        } catch {
            setAddError("Sunucu bağlantı hatası oluştu.");
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteCustomContact = async (contact: OutreachContact) => {
        if (!contact.isCustom) return;
        const confirmed = window.confirm(`${contact.name} (${contact.email}) kaydını listeden silmek istiyor musunuz?`);
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/admin/outreach?id=${contact.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setSelectedIds((prev) => prev.filter((id) => id !== contact.id));
                await fetchOutreachAndSchedules();
                window.dispatchEvent(new Event("admin-counts-updated"));
            }
        } catch (err) {
            console.error("Delete outreach contact error:", err);
        }
    };

    const handleSendSingleEmail = async () => {
        if (!previewContact) return;

        setIsSending(true);
        setSendSuccessMessage(null);
        setSendErrorMessage(null);

        try {
            const res = await fetch("/api/admin/outreach/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contactId: previewContact.id,
                    lang: previewLang,
                    customSubject: customSubject.trim() || undefined,
                    isTest: isTestMode,
                    testEmail: sender?.email || "atayapicambalkon@gmail.com",
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSendSuccessMessage(
                    isTestMode
                        ? `Test maili başarıyla ${sender?.email} adresinize gönderildi.`
                        : `E-posta başarıyla ${previewContact.name} (${previewContact.email}) adresine iletildi.`
                );
                await fetchOutreachAndSchedules();
            } else {
                setSendErrorMessage(data.error || "E-posta gönderilirken bir hata oluştu.");
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Sunucuya bağlanılamadı.";
            setSendErrorMessage(msg);
        } finally {
            setIsSending(false);
        }
    };

    const handleScheduleSingleEmail = async () => {
        if (!previewContact) return;

        setIsSchedulingSingle(true);
        setSendSuccessMessage(null);
        setSendErrorMessage(null);

        try {
            const res = await fetch("/api/admin/outreach/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contactId: previewContact.id,
                    lang: previewLang,
                    customSubject: customSubject.trim() || undefined,
                    isTest: isTestMode,
                    testEmail: sender?.email || "atayapicambalkon@gmail.com",
                    targetLocalTime: singleTargetTime,
                    skipWeekends: singleSkipWeekends,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                if (Array.isArray(data.jobs)) {
                    setScheduledJobs(data.jobs);
                }
                setSendSuccessMessage(
                    data.message ||
                        `E-posta ${previewContact.country} yerel saatiyle ${singleTargetTime} için zamanlandı.`
                );
            } else {
                setSendErrorMessage(data.error || "Zamanlama kaydedilemedi.");
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Sunucuya bağlanılamadı.";
            setSendErrorMessage(msg);
        } finally {
            setIsSchedulingSingle(false);
        }
    };

    const handleStartBulkAction = async () => {
        const targetIds = selectedIds.length > 0 ? selectedIds : contacts.map((c) => c.id);
        if (targetIds.length === 0) return;

        setBulkSending(true);
        setBulkResult(null);

        if (bulkMode === "schedule_country") {
            setBulkProgress({
                total: targetIds.length,
                sent: 0,
                current: `Ülke saat dilimleri (${bulkTargetTime}) hesaplanıyor...`,
            });

            try {
                const res = await fetch("/api/admin/outreach/schedule", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contactIds: targetIds,
                        lang: bulkLang,
                        isTest: bulkIsTest,
                        testEmail: sender?.email || "atayapicambalkon@gmail.com",
                        targetLocalTime: bulkTargetTime,
                        skipWeekends: bulkSkipWeekends,
                    }),
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    if (Array.isArray(data.jobs)) {
                        setScheduledJobs(data.jobs);
                    }
                    setBulkProgress({
                        total: targetIds.length,
                        sent: targetIds.length,
                        current: "Tüm ülke zamanlamaları kuyruğa alındı",
                    });
                    setBulkResult({
                        mode: "schedule_country",
                        successful: data.scheduledCount || targetIds.length,
                        failed: 0,
                        message: data.message,
                    });
                } else {
                    setBulkProgress(null);
                    setBulkResult({
                        mode: "schedule_country",
                        successful: 0,
                        failed: targetIds.length,
                        message: data.error || "Zamanlama sırasında hata oluştu.",
                    });
                }
            } catch {
                setBulkProgress(null);
                setBulkResult({
                    mode: "schedule_country",
                    successful: 0,
                    failed: targetIds.length,
                    message: "Sunucuya bağlanılamadı.",
                });
            } finally {
                setBulkSending(false);
            }
            return;
        }

        // Immediate sequential send
        setBulkProgress({ total: targetIds.length, sent: 0, current: "Başlatılıyor..." });

        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < targetIds.length; i++) {
            const currentId = targetIds[i];
            const currentContact = contacts.find((c) => c.id === currentId);
            setBulkProgress({
                total: targetIds.length,
                sent: i,
                current: `${currentContact?.name || "Firma"} (${i + 1}/${targetIds.length})`,
            });

            try {
                const res = await fetch("/api/admin/outreach/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contactId: currentId,
                        lang: bulkLang,
                        isTest: bulkIsTest,
                        testEmail: sender?.email || "atayapicambalkon@gmail.com",
                    }),
                });

                const data = await res.json();
                if (res.ok && data.success) {
                    successCount++;
                } else {
                    failCount++;
                }
            } catch {
                failCount++;
            }
        }

        setBulkProgress({
            total: targetIds.length,
            sent: targetIds.length,
            current: "Tamamlandı",
        });

        setBulkResult({
            mode: "immediate",
            successful: successCount,
            failed: failCount,
        });
        setBulkSending(false);
        await fetchOutreachAndSchedules();
    };

    const handleSendScheduledJobNow = async (jobId: string) => {
        setActiveQueueActionId(jobId);
        try {
            const res = await fetch("/api/admin/outreach/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "send_now", jobId }),
            });
            const data = await res.json();
            if (Array.isArray(data.jobs)) {
                setScheduledJobs(data.jobs);
            }
            await fetchOutreachAndSchedules();
        } catch (err) {
            console.error("Send scheduled job now error:", err);
        } finally {
            setActiveQueueActionId(null);
        }
    };

    const handleCancelScheduledJob = async (jobId: string) => {
        setActiveQueueActionId(jobId);
        try {
            const res = await fetch(`/api/admin/outreach/schedule?id=${encodeURIComponent(jobId)}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (Array.isArray(data.jobs)) {
                setScheduledJobs(data.jobs);
            }
        } catch (err) {
            console.error("Cancel scheduled job error:", err);
        } finally {
            setActiveQueueActionId(null);
        }
    };

    const handleClearQueueScope = async (scope: "pending" | "history") => {
        if (scope === "pending") {
            const ok = window.confirm("Bekleyen tüm zamanlanmış e-postaları iptal etmek istiyor musunuz?");
            if (!ok) return;
        }
        try {
            const res = await fetch(`/api/admin/outreach/schedule?scope=${scope}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (Array.isArray(data.jobs)) {
                setScheduledJobs(data.jobs);
            }
        } catch (err) {
            console.error("Clear queue scope error:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">İhracat e-posta listesi ve ülke zamanlayıcısı yükleniyor...</p>
                </div>
            </div>
        );
    }

    const uniqueCountriesCount = new Set(contacts.map((c) => c.countryCode)).size;

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h1
                            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Avrupa &amp; B2B E-Posta Yönetimi
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                            {contacts.length} Kayıtlı Firma
                        </span>
                        {pendingJobsCount > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/35 text-indigo-300 text-xs font-semibold">
                                ⏰ {pendingJobsCount} Zamanlanmış Mail
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-400 mt-1">
                        Ortalanmış resmi Ata Yapı logolu antetli şablonla hemen gönderin veya her ülkenin kendi sabah 09:00 mesai saatine otomatik zamanlayın.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setAddError(null);
                            setIsAddModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Yeni Firma Ekle</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setSelectedIds(contacts.map((c) => c.id));
                            setBulkMode("schedule_country");
                            setBulkTargetTime("09:00");
                            setBulkResult(null);
                            setBulkProgress(null);
                            setNowMs(Date.now());
                            setIsBulkModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-950/50"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="9" />
                            <polyline points="12 7 12 12 15 14" />
                        </svg>
                        <span>Ülke Saati 09:00&apos;a Zamanla ({contacts.length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setSelectedIds(contacts.map((c) => c.id));
                            setBulkMode("immediate");
                            setBulkResult(null);
                            setBulkProgress(null);
                            setNowMs(Date.now());
                            setIsBulkModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                        <span>Tümüne Şimdi Gönder</span>
                    </button>

                    <button
                        type="button"
                        onClick={copyAllEmails}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors border border-slate-800 cursor-pointer"
                    >
                        {copiedAll ? (
                            <span className="text-emerald-400">E-Postalar Kopyalandı</span>
                        ) : (
                            <span>Mailleri Kopyala</span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={downloadCsv}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors border border-slate-800 cursor-pointer"
                    >
                        <span>CSV İndir</span>
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Kayıtlı Alıcılar
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                        {contacts.length}
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                        B2B İthalatçı &amp; Kurumsal Liste
                    </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Akıllı Saat Dilimi
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-indigo-400">
                        {uniqueCountriesCount} Ülke • 09:00
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                        Her ülkenin kendi sabah 09:00 mesaisinde teslim
                    </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Gönderici SMTP
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white truncate font-mono mt-1">
                        {sender?.email || "atayapicambalkon@gmail.com"}
                    </div>
                    <p className="text-xs text-emerald-400 mt-1.5">Ortalanmış Resmi Ata Yapı Logolu</p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Zamanlama Kuyruğu
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                        {pendingJobsCount > 0 ? `${pendingJobsCount} Bekleyen` : "Hazır"}
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                        Otomatik arka plan zamanlayıcı aktif
                    </p>
                </div>
            </div>

            {/* Scheduled Outreach Queue Panel */}
            {scheduledJobs.length > 0 && (
                <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 bg-indigo-950/30 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                                <h2 className="text-sm sm:text-base font-bold text-white">
                                    Ülke Saatine Göre Zamanlanmış E-Posta Kuyruğu
                                </h2>
                                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                                    {pendingJobsCount} Bekleyen
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Her alıcıya kendi ülkesinin yerel saat diliminde (yaz/kış saati otomatik hesaplanarak) tam hedef saatte gönderilir.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {pendingJobsCount > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleClearQueueScope("pending")}
                                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/25 text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    Bekleyenleri İptal Et
                                </button>
                            )}
                            {scheduledJobs.some((j) => j.status === "sent" || j.status === "failed") && (
                                <button
                                    type="button"
                                    onClick={() => handleClearQueueScope("history")}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    Tamamlananları Temizle
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto max-h-80 overflow-y-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider">
                                    <th className="py-2.5 px-4">Firma &amp; Dil</th>
                                    <th className="py-2.5 px-4">Ülke &amp; Saat Dilimi</th>
                                    <th className="py-2.5 px-4">Ülke Teslim Saati</th>
                                    <th className="py-2.5 px-4">Türkiye Saati</th>
                                    <th className="py-2.5 px-4">Durum</th>
                                    <th className="py-2.5 px-4 text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-slate-200">
                                {scheduledJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-800/35">
                                        <td className="py-3 px-4">
                                            <div className="font-semibold text-white flex items-center gap-1.5">
                                                <span>{job.contactName}</span>
                                                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold uppercase text-blue-300">
                                                    {job.lang}
                                                </span>
                                                {job.isTest && (
                                                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] font-bold text-amber-300">
                                                        TEST
                                                    </span>
                                                )}
                                            </div>
                                            <div className="font-mono text-[11px] text-slate-400">
                                                {job.isTest ? job.testEmail : job.email}
                                            </div>
                                        </td>

                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <div className="font-semibold text-slate-200">
                                                {job.flag} {job.countryNameTr} ({job.countryCode})
                                            </div>
                                            <div className="text-[11px] text-slate-500 font-mono">{job.timeZone}</div>
                                        </td>

                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 font-semibold">
                                                ⏰ {job.recipientLocalLabel}
                                            </span>
                                        </td>

                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <div className="text-slate-200 font-medium">🇹🇷 {job.turkeyLocalLabel}</div>
                                            {job.status === "pending" && (
                                                <div className="text-[11px] text-indigo-300">
                                                    {formatRemainingCountdown(job.scheduledAtUtc, nowMs)}
                                                </div>
                                            )}
                                        </td>

                                        <td className="py-3 px-4 whitespace-nowrap">
                                            {job.status === "pending" && (
                                                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
                                                    Sırada Bekliyor
                                                </span>
                                            )}
                                            {job.status === "sending" && (
                                                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold">
                                                    Gönderiliyor...
                                                </span>
                                            )}
                                            {job.status === "sent" && (
                                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                                                    ✓ Gönderildi
                                                </span>
                                            )}
                                            {job.status === "failed" && (
                                                <span
                                                    className="px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 font-semibold"
                                                    title={job.error}
                                                >
                                                    Hata Oluştu
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-3 px-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {(job.status === "pending" || job.status === "failed") && (
                                                    <button
                                                        type="button"
                                                        disabled={activeQueueActionId === job.id}
                                                        onClick={() => handleSendScheduledJobNow(job.id)}
                                                        className="px-2.5 py-1 rounded-lg bg-emerald-600/25 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-200 font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                    >
                                                        Şimdi Gönder
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    disabled={activeQueueActionId === job.id}
                                                    onClick={() => handleCancelScheduledJob(job.id)}
                                                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-slate-700 font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    {job.status === "pending" ? "İptal" : "Sil"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Selection Bar */}
            {selectedIds.length > 0 && (
                <div className="bg-indigo-950/50 border border-indigo-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-indigo-500/25 border border-indigo-500/40 flex items-center justify-center text-sm font-bold text-indigo-200">
                            {selectedIds.length}
                        </span>
                        <div>
                            <div className="text-sm font-bold text-white">
                                {selectedIds.length} firma seçildi
                            </div>
                            <div className="text-xs text-slate-300">
                                Seçili firmaları ülkelerinin sabah 09:00 saatine zamanlayabilir veya anında gönderebilirsiniz.
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setBulkMode("schedule_country");
                                setBulkTargetTime("09:00");
                                setBulkResult(null);
                                setBulkProgress(null);
                                setNowMs(Date.now());
                                setIsBulkModalOpen(true);
                            }}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                            ⏰ Seçilenleri 09:00&apos;a Zamanla ({selectedIds.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setBulkMode("immediate");
                                setBulkResult(null);
                                setBulkProgress(null);
                                setNowMs(Date.now());
                                setIsBulkModalOpen(true);
                            }}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                            ⚡ Şimdi Gönder ({selectedIds.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors cursor-pointer"
                        >
                            Temizle
                        </button>
                    </div>
                </div>
            )}

            {/* Filter Tabs & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                    {filterCountryOptions.map((opt) => (
                        <button
                            type="button"
                            key={opt.key}
                            onClick={() => setSelectedCountryFilter(opt.key)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedCountryFilter === opt.key
                                ? "bg-[var(--primary)] text-white"
                                : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                                }`}
                        >
                            {opt.label} ({opt.count})
                        </button>
                    ))}
                </div>

                <div className="relative w-full lg:w-72">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Firma, e-posta veya sektör ara..."
                        className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                    />
                    <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-4 w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === filteredContacts.length && filteredContacts.length > 0}
                                        onChange={toggleSelectAll}
                                        className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                    />
                                </th>
                                <th className="py-3.5 px-4">Hedef Firma &amp; Sektör</th>
                                <th className="py-3.5 px-4">Ülke &amp; 09:00 Zamanı</th>
                                <th className="py-3.5 px-4">E-Posta Adresi</th>
                                <th className="py-3.5 px-4">Durum</th>
                                <th className="py-3.5 px-5 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
                            {filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-500">
                                        Aramanıza uygun kayıtlı firma bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filteredContacts.map((contact) => {
                                    const tzInfo = computeNextCountryLocalSchedule(contact.countryCode, {
                                        email: contact.email,
                                        targetLocalTime: "09:00",
                                        skipWeekends: true,
                                        now: new Date(nowMs),
                                    });
                                    const pendingJob = pendingJobByContactId.get(contact.id);

                                    return (
                                        <tr key={contact.id} className="hover:bg-slate-800/40 transition-colors">
                                            <td className="py-3.5 px-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(contact.id)}
                                                    onChange={() => toggleSelect(contact.id)}
                                                    className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                                />
                                            </td>

                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-white">{contact.name}</span>
                                                    {contact.isCustom && (
                                                        <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[10px] font-semibold">
                                                            Özel Eklenen
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-0.5">
                                                    {contact.category}
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200">
                                                    <span>{tzInfo.flag}</span>
                                                    <span className="font-mono font-bold text-blue-400">
                                                        {contact.countryCode}
                                                    </span>
                                                    <span>{tzInfo.countryNameTr}</span>
                                                </span>
                                                <div className="text-[11px] text-slate-400 mt-1">
                                                    Şu an <strong className="text-slate-300">{tzInfo.currentCountryClock}</strong> • 09:00 →{" "}
                                                    <span className="text-indigo-300">TR {tzInfo.turkeyLocalLabel.slice(-5)}</span>
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={`mailto:${contact.email}`}
                                                        className="font-mono text-xs text-blue-400 hover:underline"
                                                    >
                                                        {contact.email}
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={() => copyToClipboard(contact.email)}
                                                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                                        title="E-postayı Kopyala"
                                                    >
                                                        {copiedEmail === contact.email ? (
                                                            <span className="text-[10px] text-emerald-400 font-sans font-semibold">
                                                                Kopyalandı
                                                            </span>
                                                        ) : (
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                {pendingJob ? (
                                                    <span
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/35 text-indigo-200"
                                                        title={`Türkiye Saati: ${pendingJob.turkeyLocalLabel}`}
                                                    >
                                                        ⏰ {pendingJob.recipientLocalLabel}
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                            contact.lastSentAt || contact.status === "delivered"
                                                                ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-300"
                                                                : "bg-slate-800 border border-slate-700 text-slate-300"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${
                                                                contact.lastSentAt || contact.status === "delivered"
                                                                    ? "bg-emerald-400"
                                                                    : "bg-slate-400"
                                                            }`}
                                                        />
                                                        {contact.lastSentAt
                                                            ? "Gönderildi"
                                                            : contact.status === "delivered"
                                                            ? "İletildi"
                                                            : "Gönderime Hazır"}
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openPreviewModal(contact)}
                                                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                                                    >
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <line x1="22" y1="2" x2="11" y2="13" />
                                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                        </svg>
                                                        <span>Önizle &amp; Zamanla</span>
                                                    </button>

                                                    {contact.isCustom && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteCustomContact(contact)}
                                                            className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/25 text-xs font-semibold transition-colors cursor-pointer"
                                                            title="Kaydı Sil"
                                                        >
                                                            Sil
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add New Contact Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                            <div>
                                <h3 className="text-lg font-bold text-white">Yeni Firma / Alıcı Ekle</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Seçtiğiniz ülkenin yerel sabah 09:00 saati otomatik tanımlanır.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {addError && (
                            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium">
                                {addError}
                            </div>
                        )}

                        <form onSubmit={handleAddContact} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    Firma veya Kurum Adı *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newCompany}
                                    onChange={(e) => setNewCompany(e.target.value)}
                                    placeholder="Örn: Müller Fensterbau GmbH"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    E-Posta Adresi *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="info@firma.de"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Ülke &amp; Saat Dilimi
                                    </label>
                                    <select
                                        value={newCountryCode}
                                        onChange={(e) => setNewCountryCode(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-[var(--primary)]"
                                    >
                                        {COUNTRY_OPTIONS.map((c) => (
                                            <option key={c.code} value={c.code}>
                                                {c.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Şablon Tipi
                                    </label>
                                    <select
                                        value={newGroup}
                                        onChange={(e) => setNewGroup(e.target.value as "business" | "alevi")}
                                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-[var(--primary)]"
                                    >
                                        <option value="business">B2B Ticari İhracat</option>
                                        <option value="alevi">Kurum / Topluluk</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    Sektör / Kategori
                                </label>
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isAdding}
                                    className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                                >
                                    {isAdding ? "Ekleniyor..." : "Listeye Ekle"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Single Email Preview, Send & Country 09:00 Schedule Modal */}
            {previewContact && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
                            <div>
                                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                                    Logolu Kurumsal E-Posta Önizleme &amp; Ülke Zamanlayıcı
                                </div>
                                <h3 className="text-lg font-bold text-white mt-0.5">
                                    {previewContact.name} ({previewContact.countryCode})
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreviewContact(null)}
                                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Language & Test Controls */}
                        <div className="px-5 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-400">Şablon Dili:</span>
                                <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800">
                                    <button
                                        type="button"
                                        onClick={() => handlePreviewLangChange("tr")}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${previewLang === "tr"
                                            ? "bg-emerald-600 text-white"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        TR Türkçe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePreviewLangChange("en")}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${previewLang === "en"
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        EN English
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isTestMode}
                                    onChange={(e) => setIsTestMode(e.target.checked)}
                                    className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                />
                                <span className="text-amber-300 font-medium">Test Modu (Kendi Mailime Gönder)</span>
                            </label>
                        </div>

                        {/* Meta, Subject & Country 09:00 Scheduler Bar */}
                        <div className="px-5 py-3 bg-slate-950/50 border-b border-slate-800 text-xs text-slate-400 space-y-2.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span>
                                    <strong className="text-slate-300">Alıcı:</strong>{" "}
                                    <span className="font-mono text-blue-400">
                                        {isTestMode ? `${sender?.email} (TEST)` : previewContact.email}
                                    </span>
                                </span>
                                {singleSchedulePreview && (
                                    <span className="text-slate-400">
                                        {singleSchedulePreview.flag} {singleSchedulePreview.countryNameTr} şu an:{" "}
                                        <strong className="text-white font-mono">{singleSchedulePreview.currentCountryClock}</strong>
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="text-slate-300 font-semibold shrink-0">Konu:</label>
                                <input
                                    type="text"
                                    value={customSubject}
                                    onChange={(e) => setCustomSubject(e.target.value)}
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            {/* Country Local Time Scheduler Config */}
                            {singleSchedulePreview && (
                                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-indigo-200 font-semibold">
                                            ⏰ {singleSchedulePreview.flag} {singleSchedulePreview.countryNameTr} Hedef Saat:
                                        </span>
                                        <input
                                            type="time"
                                            value={singleTargetTime}
                                            onChange={(e) => setSingleTargetTime(e.target.value || "09:00")}
                                            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-indigo-500/40 text-white font-mono text-xs focus:outline-none"
                                        />
                                        <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer ml-1">
                                            <input
                                                type="checkbox"
                                                checked={singleSkipWeekends}
                                                onChange={(e) => setSingleSkipWeekends(e.target.checked)}
                                                className="rounded border-slate-700 cursor-pointer w-3.5 h-3.5"
                                            />
                                            <span>Hafta sonunu atla (Pzt)</span>
                                        </label>
                                    </div>

                                    <div className="text-[11px] text-indigo-200 font-medium">
                                        Teslim: <strong className="text-white">{singleSchedulePreview.recipientLocalLabel}</strong>{" "}
                                        <span className="text-slate-400">(🇹🇷 TR: {singleSchedulePreview.turkeyLocalLabel})</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {sendSuccessMessage && (
                            <div className="mx-5 mt-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                                ✓ {sendSuccessMessage}
                            </div>
                        )}

                        {sendErrorMessage && (
                            <div className="mx-5 mt-3 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold">
                                Hata: {sendErrorMessage}
                            </div>
                        )}

                        {/* Rendered HTML Preview (Centered Official Ata Yapı Logo) */}
                        <div className="p-4 sm:p-5 overflow-y-auto bg-slate-950/30 flex-1">
                            <div
                                className="rounded-xl overflow-hidden max-w-2xl mx-auto shadow-lg"
                                dangerouslySetInnerHTML={{
                                    __html: getEmailHtml(previewContact, previewLang),
                                }}
                            />
                        </div>

                        {/* Footer with BOTH Country Schedule (09:00) & Immediate Send */}
                        <div className="p-4 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => setPreviewContact(null)}
                                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer w-full sm:w-auto"
                            >
                                Kapat
                            </button>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={handleScheduleSingleEmail}
                                    disabled={isSchedulingSingle || isSending}
                                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    {isSchedulingSingle ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Zamanlanıyor...</span>
                                        </>
                                    ) : (
                                        <span>
                                            ⏰ {singleSchedulePreview?.countryNameTr || "Ülke"} {singleTargetTime}&apos;a Zamanla
                                        </span>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSendSingleEmail}
                                    disabled={isSending || isSchedulingSingle}
                                    className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                                        isTestMode
                                            ? "bg-amber-600 hover:bg-amber-500"
                                            : "bg-emerald-600 hover:bg-emerald-500"
                                    }`}
                                >
                                    {isSending ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Gönderiliyor...</span>
                                        </>
                                    ) : (
                                        <span>
                                            {isTestMode
                                                ? "⚡ Test Maili Şimdi Gönder"
                                                : `⚡ Şimdi Hemen Gönder (${previewLang.toUpperCase()})`}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Send & Country-Aware 09:00 Schedule Modal */}
            {isBulkModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">
                                    Toplu Gönderim &amp; Akıllı Ülke Zamanlayıcı
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Seçili {selectedIds.length} firmaya resmi Ata Yapı logolu kurumsal e-posta gönderimi
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!bulkSending) setIsBulkModalOpen(false);
                                }}
                                disabled={bulkSending}
                                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Sending Timing Mode */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                    Gönderim Zamanlaması
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setBulkMode("schedule_country")}
                                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                            bulkMode === "schedule_country"
                                                ? "bg-indigo-600/20 border-indigo-400 text-indigo-200"
                                                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        <div className="text-xs font-bold flex items-center gap-1.5">
                                            <span>⏰ Ülke Saatine Göre 09:00</span>
                                        </div>
                                        <div className="text-[11px] opacity-80 mt-1">
                                            Almanya, Belçika, Portekiz, Yunanistan vb. her ülkenin kendi sabah 09:00&apos;ında teslim edilir.
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setBulkMode("immediate")}
                                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                            bulkMode === "immediate"
                                                ? "bg-emerald-600/20 border-emerald-500 text-emerald-200"
                                                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        <div className="text-xs font-bold flex items-center gap-1.5">
                                            <span>⚡ Şimdi Sırayla Gönder</span>
                                        </div>
                                        <div className="text-[11px] opacity-80 mt-1">
                                            Beklemeden tüm seçili firmalara şu an Gmail SMTP ile sırayla gönderir.
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Country Timezone Settings & Breakdown when Schedule Mode is active */}
                            {bulkMode === "schedule_country" && (
                                <div className="p-4 rounded-xl bg-indigo-950/35 border border-indigo-500/30 space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <label className="text-xs font-semibold text-indigo-200">
                                                Hedef Ülke Sabah Saati:
                                            </label>
                                            <input
                                                type="time"
                                                value={bulkTargetTime}
                                                onChange={(e) => setBulkTargetTime(e.target.value || "09:00")}
                                                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-indigo-400/40 text-white font-mono text-xs focus:outline-none"
                                            />
                                            <div className="flex items-center gap-1">
                                                {["08:30", "09:00", "10:00"].map((preset) => (
                                                    <button
                                                        key={preset}
                                                        type="button"
                                                        onClick={() => setBulkTargetTime(preset)}
                                                        className={`px-2 py-1 rounded text-[11px] font-mono font-semibold cursor-pointer ${
                                                            bulkTargetTime === preset
                                                                ? "bg-indigo-500 text-white"
                                                                : "bg-slate-900 text-slate-400 hover:text-white"
                                                        }`}
                                                    >
                                                        {preset}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={bulkSkipWeekends}
                                                onChange={(e) => setBulkSkipWeekends(e.target.checked)}
                                                className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                            />
                                            <span>Hafta sonunu atla (Pazartesi sabahı)</span>
                                        </label>
                                    </div>

                                    <div className="space-y-1.5 pt-1">
                                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                            Ülkelere Göre Otomatik Gönderim Planı:
                                        </div>
                                        {bulkCountryBreakdown.map((group) => (
                                            <div
                                                key={group.key}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs"
                                            >
                                                <div className="font-medium text-white">
                                                    {Array.from(group.flags).join("")}{" "}
                                                    {Array.from(group.countriesTr).join(", ")}{" "}
                                                    <span className="text-slate-400">({group.count} firma)</span>
                                                </div>
                                                <div className="text-[11px] text-indigo-300 font-mono">
                                                    Yerel: <strong>{group.recipientLocalLabel}</strong> • 🇹🇷 TR:{" "}
                                                    {group.turkeyLocalLabel.slice(-5)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Template Language */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                    Gönderim Dili
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setBulkLang("tr")}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${bulkLang === "tr"
                                            ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        TR Türkçe İhracat Şablonu
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setBulkLang("en")}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${bulkLang === "en"
                                            ? "bg-blue-600/20 border-blue-500 text-blue-300"
                                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        EN English Wholesale Template
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={bulkIsTest}
                                    onChange={(e) => setBulkIsTest(e.target.checked)}
                                    className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                />
                                <div>
                                    <div className="font-semibold text-amber-300">Güvenli Test Modu</div>
                                    <div className="text-[11px] text-slate-400">
                                        Mailler alıcılara değil, kendi adresinize ({sender?.email}) gönderilir.
                                    </div>
                                </div>
                            </label>
                        </div>

                        {bulkProgress && (
                            <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400">{bulkProgress.current}</span>
                                    <span className="text-white font-bold">
                                        {bulkProgress.sent} / {bulkProgress.total}
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-300"
                                        style={{ width: `${(bulkProgress.sent / bulkProgress.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {bulkResult && (
                            <div
                                className={`p-4 rounded-xl text-xs font-semibold border ${
                                    bulkResult.successful > 0
                                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                                        : "bg-red-500/15 border-red-500/30 text-red-300"
                                }`}
                            >
                                {bulkResult.message
                                    ? `✓ ${bulkResult.message}`
                                    : `✓ Gönderim tamamlandı: ${bulkResult.successful} başarılı, ${bulkResult.failed} başarısız.`}
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsBulkModalOpen(false)}
                                disabled={bulkSending}
                                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                            >
                                {bulkResult ? "Kapat" : "İptal"}
                            </button>

                            {!bulkResult && (
                                <button
                                    type="button"
                                    onClick={handleStartBulkAction}
                                    disabled={bulkSending || selectedIds.length === 0}
                                    className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 ${
                                        bulkMode === "schedule_country"
                                            ? "bg-indigo-600 hover:bg-indigo-500"
                                            : "bg-blue-600 hover:bg-blue-500"
                                    }`}
                                >
                                    {bulkSending ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>İşleniyor...</span>
                                        </>
                                    ) : bulkMode === "schedule_country" ? (
                                        <span>
                                            ⏰ {selectedIds.length} Firmayı Ülke Saati {bulkTargetTime}&apos;a Zamanla
                                        </span>
                                    ) : (
                                        <span>⚡ Şimdi Gönder ({selectedIds.length} Firma)</span>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
