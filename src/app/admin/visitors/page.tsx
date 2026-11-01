"use client";

import { useEffect, useState } from "react";

interface Visitor {
    id: number;
    ip: string;
    country: string | null;
    city: string | null;
    browser: string | null;
    os: string | null;
    device: string | null;
    referrer: string | null;
    pages: string[];
    firstVisit: string;
    lastVisit: string;
    visitCount: number;
}

export default function VisitorsPage() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchVisitors() {
            try {
                const res = await fetch("/api/visitors", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch visitors");
                const data = await res.json();
                setVisitors(data.visitors || []);
            } catch (err) {
                console.error("Error fetching visitors:", err);
                setError("Ziyaretçiler yüklenirken hata oluştu.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchVisitors();
    }, []);

    const filteredVisitors = visitors.filter((v) => {
        const q = filter.toLowerCase();
        return (
            (v.city?.toLowerCase() || "").includes(q) ||
            (v.country?.toLowerCase() || "").includes(q) ||
            (v.browser?.toLowerCase() || "").includes(q) ||
            (v.device?.toLowerCase() || "").includes(q) ||
            v.ip.toLowerCase().includes(q)
        );
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Ziyaretçi kayıtları yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                    <p className="text-red-400 text-sm">{error}</p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                        Tekrar Dene
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Ziyaretçi Kayıtları
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Siteyi ziyaret eden gerçek kullanıcıların konum, cihaz ve gezinti geçmişi.
                </p>
            </div>

            {/* Search */}
            <div className="max-w-md">
                <input
                    type="text"
                    placeholder="Şehir, ülke, IP, tarayıcı veya cihaz ara..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                />
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
                {/* Visitor List */}
                <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950/60 border-b border-slate-800">
                                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="px-4 py-3.5">Konum &amp; IP</th>
                                    <th className="px-4 py-3.5">Tarayıcı</th>
                                    <th className="px-4 py-3.5">Cihaz</th>
                                    <th className="px-4 py-3.5">Sayfa</th>
                                    <th className="px-4 py-3.5">Son Ziyaret</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/70 text-sm">
                                {filteredVisitors.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                                            Henüz ziyaretçi kaydı bulunmuyor.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVisitors.map((visitor) => (
                                        <tr
                                            key={visitor.id}
                                            onClick={() => setSelectedVisitor(visitor)}
                                            className={`cursor-pointer transition-colors ${
                                                selectedVisitor?.id === visitor.id
                                                    ? "bg-slate-800/80"
                                                    : "hover:bg-slate-800/40"
                                            }`}
                                        >
                                            <td className="px-4 py-3.5">
                                                <div className="text-white font-medium">
                                                    {visitor.city || "Bilinmiyor"}
                                                    {visitor.country ? `, ${visitor.country}` : ""}
                                                </div>
                                                <div className="text-xs font-mono text-slate-500">
                                                    {visitor.ip}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-slate-300">{visitor.browser || "-"}</td>
                                            <td className="px-4 py-3.5 text-slate-300">{visitor.device || "-"}</td>
                                            <td className="px-4 py-3.5 text-slate-300 font-semibold">
                                                {visitor.pages?.length || 0}
                                            </td>
                                            <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">
                                                {new Date(visitor.lastVisit).toLocaleString("tr-TR")}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Visitor Details */}
                <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 lg:sticky lg:top-24">
                    {selectedVisitor ? (
                        <>
                            <h2 className="text-lg font-bold text-white pb-3 mb-4 border-b border-slate-800">
                                Ziyaretçi Detayı
                            </h2>

                            <div className="space-y-2.5 mb-6">
                                <DetailRow label="IP Adresi" value={selectedVisitor.ip} mono />
                                <DetailRow
                                    label="Konum"
                                    value={`${selectedVisitor.city || "Bilinmiyor"}, ${selectedVisitor.country || "Bilinmiyor"}`}
                                />
                                <DetailRow label="Tarayıcı" value={selectedVisitor.browser || "-"} />
                                <DetailRow label="İşletim Sistemi" value={selectedVisitor.os || "-"} />
                                <DetailRow label="Cihaz" value={selectedVisitor.device || "-"} />
                                <DetailRow label="Kaynak" value={selectedVisitor.referrer || "Doğrudan Giriş"} />
                                <DetailRow label="Oturum Sayısı" value={String(selectedVisitor.visitCount || 1)} />
                                <DetailRow
                                    label="İlk Ziyaret"
                                    value={new Date(selectedVisitor.firstVisit).toLocaleString("tr-TR")}
                                />
                            </div>

                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                                İncelenen Sayfalar ({selectedVisitor.pages?.length || 0})
                            </h3>
                            <div className="space-y-1.5 max-h-60 overflow-y-auto">
                                {selectedVisitor.pages && selectedVisitor.pages.length > 0 ? (
                                    selectedVisitor.pages.map((page, i) => (
                                        <div
                                            key={i}
                                            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200"
                                        >
                                            {page}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-slate-500 text-xs">Sayfa kaydı yok.</div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-slate-500 py-10 text-sm">
                            Detayları görmek için tablodan bir ziyaretçi seçin.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="flex justify-between gap-3 py-1 border-b border-slate-800/50 text-xs sm:text-sm">
            <span className="text-slate-400 shrink-0">{label}</span>
            <span className={`text-white text-right truncate ${mono ? "font-mono text-xs" : ""}`}>
                {value}
            </span>
        </div>
    );
}
