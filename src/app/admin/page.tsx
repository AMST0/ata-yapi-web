"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
    totalVisitors: number;
    todayVisitors: number;
    totalPageViews: number;
    pageViews: Record<string, number>;
    browsers: Record<string, number>;
    devices: Record<string, number>;
}

interface Visitor {
    id: number;
    ip: string;
    city: string | null;
    browser: string | null;
    device: string | null;
    pages: string[];
    lastVisit: string;
}

interface MessageSummary {
    id: number;
    name: string;
    phone: string;
    service: string | null;
    message: string | null;
    read: boolean;
    createdAt: string;
}

interface QuoteSummary {
    id: number;
    quoteNumber: string;
    customerName: string;
    total: number;
    status: "draft" | "sent" | "accepted" | "rejected";
    createdAt: string;
}

interface SystemInfo {
    dbMode: "postgresql" | "memory";
    smtpConfigured: boolean;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [messages, setMessages] = useState<MessageSummary[]>([]);
    const [quotes, setQuotes] = useState<QuoteSummary[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [outreachCount, setOutreachCount] = useState(16);
    const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>("");

    const fetchDashboard = useCallback(async () => {
        setIsLoading(true);
        try {
            const [authRes, statsRes, visitorsRes, messagesRes, quotesRes, outreachRes] =
                await Promise.allSettled([
                    fetch("/api/admin/auth", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
                    fetch("/api/track", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
                    fetch("/api/visitors", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
                    fetch("/api/messages", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
                    fetch("/api/quotes", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
                    fetch("/api/admin/outreach", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
                ]);

            if (authRes.status === "fulfilled" && authRes.value?.system) {
                setSystemInfo(authRes.value.system);
            }
            if (statsRes.status === "fulfilled" && statsRes.value) {
                setStats(statsRes.value);
            }
            if (visitorsRes.status === "fulfilled" && visitorsRes.value) {
                setVisitors(visitorsRes.value.visitors || []);
            }
            if (messagesRes.status === "fulfilled" && messagesRes.value) {
                setMessages(messagesRes.value.messages || []);
                setUnreadCount(Number(messagesRes.value.unreadCount) || 0);
            }
            if (quotesRes.status === "fulfilled" && quotesRes.value) {
                setQuotes(quotesRes.value.quotes || []);
            }
            if (outreachRes.status === "fulfilled" && outreachRes.value?.contacts) {
                setOutreachCount(outreachRes.value.contacts.length);
            }

            setLastUpdated(new Date().toLocaleTimeString("tr-TR"));
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Canlı veriler yükleniyor...</p>
                </div>
            </div>
        );
    }

    const recentVisitors = visitors.slice(0, 5);
    const recentMessages = [...messages]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);
    const recentQuotes = [...quotes]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    const acceptedQuoteTotal = quotes
        .filter((q) => q.status === "accepted")
        .reduce((sum, q) => sum + (Number(q.total) || 0), 0);

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header & System Health */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1
                        className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Yönetim Özeti
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Gerçek zamanlı ziyaretçi trafiği, müşteri talepleri, teklifler ve ihracat operasyonları.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {systemInfo && (
                        <>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                                <span
                                    className={`w-2 h-2 rounded-full ${systemInfo.dbMode === "postgresql" ? "bg-emerald-400" : "bg-amber-400"
                                        }`}
                                />
                                DB: {systemInfo.dbMode === "postgresql" ? "PostgreSQL" : "Sunucu Belleği"}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                                <span
                                    className={`w-2 h-2 rounded-full ${systemInfo.smtpConfigured ? "bg-emerald-400" : "bg-amber-400"
                                        }`}
                                />
                                SMTP Mail: {systemInfo.smtpConfigured ? "Aktif" : "Varsayılan"}
                            </span>
                        </>
                    )}
                    <button
                        type="button"
                        onClick={fetchDashboard}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                    >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 4 23 10 17 10" />
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        <span>Yenile {lastUpdated ? `(${lastUpdated})` : ""}</span>
                    </button>
                </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3.5">
                <Link
                    href="/admin/seo"
                    className="group p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-pink-950/30 hover:from-slate-900 hover:to-pink-950/50 border border-pink-500/30 hover:border-pink-500/60 transition-all flex items-center justify-between"
                >
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                            Ücretsiz Görünürlük
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">
                            Google &amp; Instagram SEO
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                            IndexNow • XML Feed • Post Stüdyosu
                        </div>
                    </div>
                    <span className="w-9 h-9 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </span>
                </Link>
                <Link
                    href="/teklif"
                    target="_blank"
                    className="group p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-[var(--primary)]/50 transition-all flex items-center justify-between"
                >
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Hızlı İşlem
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">Yeni PDF Teklif Hazırla</div>
                        <div className="text-xs text-slate-400 mt-0.5">Antetli teklif &amp; WhatsApp</div>
                    </div>
                    <span className="w-9 h-9 rounded-xl bg-red-500/10 text-[var(--primary)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </span>
                </Link>

                <Link
                    href="/admin/messages"
                    className="group p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between"
                >
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                            İletişim Formu
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">
                            Müşteri Mesajları ({messages.length})
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                            {unreadCount > 0 ? `${unreadCount} okunmamış talep var` : "Tüm mesajlar okundu"}
                        </div>
                    </div>
                    <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <MessageIcon className="w-4 h-4" />
                    </span>
                </Link>

                <Link
                    href="/admin/outreach"
                    className="group p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all flex items-center justify-between"
                >
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                            B2B İhracat
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">
                            Avrupa Mail Gönderimi
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                            {outreachCount} kayıtlı firma (TR / EN)
                        </div>
                    </div>
                    <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <GlobeIcon className="w-4 h-4" />
                    </span>
                </Link>

                <Link
                    href="/admin/quotes"
                    className="group p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between"
                >
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                            Teklif Arşivi
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">
                            Kayıtlı Teklifler ({quotes.length})
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                            Onaylı: {acceptedQuoteTotal.toLocaleString("tr-TR")} ₺
                        </div>
                    </div>
                    <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <ChartIcon className="w-4 h-4" />
                    </span>
                </Link>
            </div>

            {/* Primary KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Toplam Ziyaretçi"
                    value={stats?.totalVisitors || 0}
                    icon={<UsersIcon className="w-5 h-5" />}
                    color="blue"
                />
                <StatCard
                    title="Bugünkü Ziyaretçi"
                    value={stats?.todayVisitors || 0}
                    icon={<CalendarIcon className="w-5 h-5" />}
                    color="emerald"
                />
                <StatCard
                    title="Sayfa Görüntüleme"
                    value={stats?.totalPageViews || 0}
                    icon={<EyeIcon className="w-5 h-5" />}
                    color="violet"
                />
                <StatCard
                    title="Okunmamış Mesaj"
                    value={unreadCount}
                    icon={<MessageIcon className="w-5 h-5" />}
                    color="rose"
                    badge={unreadCount > 0}
                />
            </div>

            {/* European Outreach Summary Banner */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                                B2B İhracat &amp; Tanıtım
                            </span>
                            <h2 className="text-base sm:text-lg font-bold text-white">
                                Avrupa Toptan Tedarik E-Posta Yönetimi
                            </h2>
                        </div>
                        <p className="text-sm text-slate-400 max-w-3xl">
                            Almanya, Belçika, Hollanda, Avusturya, İsviçre, Portekiz ve Yunanistan&apos;daki
                            pencere, cam balkon ve sineklik firmalarına Türkçe veya İngilizce otomatik mail
                            gönderebilir, listeye yeni firma ekleyebilirsiniz.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
                            {[
                                { code: "DE", name: "Almanya" },
                                { code: "BE", name: "Belçika" },
                                { code: "AT", name: "Avusturya" },
                                { code: "CH", name: "İsviçre" },
                                { code: "NL", name: "Hollanda" },
                                { code: "PT", name: "Portekiz" },
                                { code: "GR", name: "Yunanistan" },
                            ].map((c) => (
                                <span
                                    key={c.code}
                                    className="inline-flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg"
                                >
                                    <span className="font-mono font-bold text-[11px] text-blue-400">{c.code}</span>
                                    <span>{c.name}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="shrink-0">
                        <Link
                            href="/admin/outreach"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors"
                        >
                            <span>Firmaları &amp; Mailleri Yönet ({outreachCount})</span>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Messages & Quotes Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Messages */}
                <div className="bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base sm:text-lg font-bold text-white">Son Müşteri Mesajları</h2>
                        <Link href="/admin/messages" className="text-xs font-semibold text-[var(--primary)] hover:underline">
                            Tümünü Aç →
                        </Link>
                    </div>
                    {recentMessages.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-sm">
                            Henüz iletişim formundan gelen mesaj bulunmuyor.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentMessages.map((msg) => (
                                <Link
                                    key={msg.id}
                                    href="/admin/messages"
                                    className="block p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/70 border border-slate-800/80 transition-colors"
                                >
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {!msg.read && (
                                                <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                                            )}
                                            <span className="font-semibold text-sm text-white truncate">
                                                {msg.name}
                                            </span>
                                            <span className="text-xs text-slate-400 truncate">
                                                • {msg.service || "Genel"}
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-slate-500 shrink-0">
                                            {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 line-clamp-1">
                                        {msg.message || msg.phone}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Quotes */}
                <div className="bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base sm:text-lg font-bold text-white">Son Hazırlanan Teklifler</h2>
                        <Link href="/admin/quotes" className="text-xs font-semibold text-[var(--primary)] hover:underline">
                            Tümünü Aç →
                        </Link>
                    </div>
                    {recentQuotes.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-sm">
                            Henüz kayıtlı teklif yok.{" "}
                            <Link href="/teklif" target="_blank" className="text-[var(--primary)] underline">
                                İlk teklifi oluşturun
                            </Link>
                            .
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentQuotes.map((q) => (
                                <Link
                                    key={q.id}
                                    href="/admin/quotes"
                                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/70 border border-slate-800/80 transition-colors"
                                >
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-white truncate">
                                            {q.customerName}
                                        </div>
                                        <div className="text-xs text-slate-400 font-mono">
                                            {q.quoteNumber} • {new Date(q.createdAt).toLocaleDateString("tr-TR")}
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-3">
                                        <div className="text-sm font-bold text-white">
                                            {Number(q.total).toLocaleString("tr-TR")} ₺
                                        </div>
                                        <div className="text-[11px] text-slate-400">
                                            {q.status === "accepted"
                                                ? "Onaylandı"
                                                : q.status === "sent"
                                                    ? "Gönderildi"
                                                    : q.status === "rejected"
                                                        ? "Reddedildi"
                                                        : "Taslak"}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Traffic & Analytics Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Visitors */}
                <div className="bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base sm:text-lg font-bold text-white">Son Ziyaretçiler</h2>
                        <Link href="/admin/visitors" className="text-xs font-semibold text-[var(--primary)] hover:underline">
                            Tümünü Gör →
                        </Link>
                    </div>
                    <div className="space-y-2.5">
                        {recentVisitors.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 text-sm">
                                Henüz ziyaretçi kaydı oluşmadı.
                            </div>
                        ) : (
                            recentVisitors.map((visitor) => (
                                <div
                                    key={visitor.id}
                                    className="flex items-center justify-between p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {(visitor.city || "TR").slice(0, 2).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm text-white font-medium truncate">
                                                {visitor.city || "Bilinmiyor"}
                                            </div>
                                            <div className="text-xs text-slate-400 truncate">
                                                {visitor.browser || "-"} • {visitor.device || "-"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-3">
                                        <div className="text-xs font-semibold text-slate-300">
                                            {visitor.pages?.length || 0} sayfa
                                        </div>
                                        <div className="text-[11px] text-slate-500">
                                            {new Date(visitor.lastVisit).toLocaleTimeString("tr-TR")}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Popular Pages */}
                <div className="bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base sm:text-lg font-bold text-white">En Çok İncelenen Sayfalar</h2>
                        <Link href="/admin/analytics" className="text-xs font-semibold text-[var(--primary)] hover:underline">
                            Detaylı Analiz →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {stats?.pageViews && Object.keys(stats.pageViews).length > 0 ? (
                            Object.entries(stats.pageViews)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 5)
                                .map(([page, count]) => {
                                    const maxCount = Math.max(...Object.values(stats.pageViews), 1);
                                    const percentage = (count / maxCount) * 100;
                                    return (
                                        <div
                                            key={page}
                                            className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80"
                                        >
                                            <div className="flex items-center justify-between mb-2 gap-2">
                                                <span className="text-xs sm:text-sm text-white font-mono truncate">
                                                    {page}
                                                </span>
                                                <span className="text-xs font-semibold text-slate-300 shrink-0">
                                                    {count} görüntüleme
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="text-center py-8 text-slate-500 text-sm">
                                Henüz sayfa görüntüleme verisi oluşmadı.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    icon,
    color,
    badge,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: "blue" | "emerald" | "violet" | "rose";
    badge?: boolean;
}) {
    const colorClasses = {
        blue: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        violet: "bg-violet-500/15 text-violet-400 border-violet-500/20",
        rose: "bg-red-500/15 text-red-400 border-red-500/20",
    };

    return (
        <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
            {badge && (
                <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            )}
            <div className={`w-10 h-10 ${colorClasses[color]} border rounded-xl flex items-center justify-center mb-3.5`}>
                {icon}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">
                {value.toLocaleString("tr-TR")}
            </div>
            <span className="text-xs sm:text-sm text-slate-400">{title}</span>
        </div>
    );
}

function UsersIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function CalendarIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function EyeIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function MessageIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
}

function ChartIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    );
}

function GlobeIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}
