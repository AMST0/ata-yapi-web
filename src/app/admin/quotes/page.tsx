"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    formatLetterheadDate,
    generateAtaYapiQuotePdf,
} from "@/lib/pdf-quote";

interface QuoteItem {
    description: string;
    price: number;
}

interface Quote {
    id: number;
    quoteNumber: string;
    customerName: string;
    customerPhone: string;
    projectAddress: string | null;
    items: QuoteItem[];
    total: number;
    validityDays: number;
    notes: string | null;
    status: "draft" | "sent" | "accepted" | "rejected";
    createdAt: string;
}

function normalizeWhatsAppPhone(phone: string): string {
    const raw = phone.replace(/\D/g, "");
    if (raw.startsWith("00")) return raw.slice(2);
    if (raw.startsWith("0")) return "90" + raw.slice(1);
    if (raw.length === 10) return "90" + raw;
    return raw;
}

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | Quote["status"]>("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchQuotes() {
            try {
                const res = await fetch("/api/quotes", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch quotes");
                const data = await res.json();
                setQuotes(data.quotes || []);
            } catch (err) {
                console.error("Error fetching quotes:", err);
                setError("Teklifler yüklenirken hata oluştu.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchQuotes();
    }, []);

    const updateStatus = async (id: number, status: Quote["status"]) => {
        try {
            const res = await fetch("/api/quotes", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (!res.ok) return;
            setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
            setSelectedQuote((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
        } catch (err) {
            console.error("Error updating quote status:", err);
        }
    };

    const handleDeleteQuote = async (quote: Quote) => {
        const confirmed = window.confirm(
            `${quote.quoteNumber} (${quote.customerName}) numaralı teklifi silmek istediğinize emin misiniz?`
        );
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/quotes?id=${quote.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setQuotes((prev) => prev.filter((q) => q.id !== quote.id));
                if (selectedQuote?.id === quote.id) {
                    setSelectedQuote(null);
                }
            }
        } catch (err) {
            console.error("Error deleting quote:", err);
        }
    };

    const filteredQuotes = quotes.filter((q) => {
        const matchesFilter = filter === "all" || q.status === filter;
        const query = search.toLowerCase();
        const matchesSearch =
            q.customerName.toLowerCase().includes(query) ||
            q.quoteNumber.toLowerCase().includes(query) ||
            (q.projectAddress?.toLowerCase() || "").includes(query);
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status: Quote["status"]) => {
        const styles = {
            draft: "bg-slate-800 text-slate-300 border-slate-700",
            sent: "bg-blue-500/15 text-blue-300 border-blue-500/25",
            accepted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
            rejected: "bg-red-500/15 text-red-300 border-red-500/25",
        };
        const labels = {
            draft: "Taslak",
            sent: "Gönderildi",
            accepted: "Onaylandı",
            rejected: "Reddedildi",
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("tr-TR").format(amount);
    };

    const handleDownloadSavedQuotePdf = async (quote: Quote) => {
        try {
            await generateAtaYapiQuotePdf({
                quoteNumber: quote.quoteNumber,
                headerTitle: "CAM BALKON SİSTEMLERİ",
                dateText: formatLetterheadDate(new Date(quote.createdAt)),
                customerName: quote.customerName,
                customerPhone: quote.customerPhone,
                projectAddress: quote.projectAddress || "",
                items: quote.items || [],
                total: Number(quote.total) || 0,
                vatLabel: "+ KDV",
                notes: quote.notes || "",
                validityDays: quote.validityDays,
            });
        } catch (err) {
            console.error("Failed to download saved quote PDF:", err);
        }
    };

    const stats = {
        total: quotes.length,
        sent: quotes.filter((q) => q.status === "sent").length,
        accepted: quotes.filter((q) => q.status === "accepted").length,
        totalValue: quotes
            .filter((q) => q.status === "accepted")
            .reduce((acc, q) => acc + (Number(q.total) || 0), 0),
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Teklifler yükleniyor...</p>
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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1
                        className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Fiyat Teklifleri
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Oluşturulan PDF tekliflerin durum takibi, kalem detayları ve WhatsApp paylaşımı.
                    </p>
                </div>
                <Link
                    href="/teklif"
                    target="_blank"
                    className="px-4 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Yeni PDF Teklif Oluştur
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
                    <div className="text-2xl sm:text-3xl font-bold text-white">{stats.total}</div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-0.5">Toplam Teklif</div>
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.sent}</div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-0.5">Müşteriye İletilen</div>
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{stats.accepted}</div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-0.5">Onaylanan İş</div>
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
                    <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                        {formatCurrency(stats.totalValue)} ₺
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-0.5">Onaylı Ciro (+KDV)</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 justify-between">
                <input
                    type="text"
                    placeholder="Müşteri adı, teklif no veya adres ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:max-w-sm px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                />
                <div className="flex flex-wrap gap-1.5">
                    {(["all", "draft", "sent", "accepted", "rejected"] as const).map((status) => (
                        <button
                            type="button"
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${filter === status
                                ? "bg-[var(--primary)] text-white"
                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                                }`}
                        >
                            {status === "all"
                                ? "Tümü"
                                : status === "draft"
                                    ? "Taslak"
                                    : status === "sent"
                                        ? "Gönderildi"
                                        : status === "accepted"
                                            ? "Onaylandı"
                                            : "Reddedildi"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quotes Table & Detail */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950/60 border-b border-slate-800">
                                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="px-4 py-3.5">Teklif No</th>
                                    <th className="px-4 py-3.5">Müşteri</th>
                                    <th className="px-4 py-3.5">Tutar</th>
                                    <th className="px-4 py-3.5">Durum</th>
                                    <th className="px-4 py-3.5">Tarih</th>
                                    <th className="px-4 py-3.5 text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/70 text-sm">
                                {filteredQuotes.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                                            Henüz kayıtlı teklif bulunmuyor.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredQuotes.map((quote) => (
                                        <tr
                                            key={quote.id}
                                            onClick={() => setSelectedQuote(quote)}
                                            className={`cursor-pointer transition-colors ${selectedQuote?.id === quote.id
                                                ? "bg-slate-800/80"
                                                : "hover:bg-slate-800/40"
                                                }`}
                                        >
                                            <td className="px-4 py-3.5 text-white font-mono text-xs font-semibold">
                                                {quote.quoteNumber}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="text-white font-medium">{quote.customerName}</div>
                                                <div className="text-xs text-slate-400">{quote.customerPhone}</div>
                                            </td>
                                            <td className="px-4 py-3.5 text-white font-bold whitespace-nowrap">
                                                {formatCurrency(quote.total)} ₺
                                            </td>
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                {getStatusBadge(quote.status)}
                                            </td>
                                            <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">
                                                {new Date(quote.createdAt).toLocaleDateString("tr-TR")}
                                            </td>
                                            <td
                                                className="px-4 py-3.5 text-right whitespace-nowrap"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDownloadSavedQuotePdf(quote)}
                                                        className="px-2.5 py-1.5 text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                                        title="Antetli PDF İndir"
                                                    >
                                                        PDF
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const formattedPhone = normalizeWhatsAppPhone(quote.customerPhone);
                                                            const message = `Sayın ${quote.customerName}, ATA YAPI olarak hazırladığımız ${quote.quoteNumber} numaralı fiyat teklifiniz toplam ${formatCurrency(quote.total)} ₺ + KDV olarak oluşturulmuştur.`;
                                                            window.open(
                                                                `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`,
                                                                "_blank"
                                                            );
                                                            if (quote.status === "draft") {
                                                                updateStatus(quote.id, "sent");
                                                            }
                                                        }}
                                                        className="px-2.5 py-1.5 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                                        title="WhatsApp ile Gönder"
                                                    >
                                                        WA
                                                    </button>
                                                    <select
                                                        value={quote.status}
                                                        onChange={(e) =>
                                                            updateStatus(quote.id, e.target.value as Quote["status"])
                                                        }
                                                        className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white cursor-pointer"
                                                    >
                                                        <option value="draft">Taslak</option>
                                                        <option value="sent">Gönderildi</option>
                                                        <option value="accepted">Onaylandı</option>
                                                        <option value="rejected">Reddedildi</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quote Detail Card */}
                <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 lg:sticky lg:top-24">
                    {selectedQuote ? (
                        <div>
                            <div className="flex items-start justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
                                <div>
                                    <div className="text-xs font-mono text-[var(--primary)] font-bold">
                                        {selectedQuote.quoteNumber}
                                    </div>
                                    <h2 className="text-lg font-bold text-white mt-0.5">
                                        {selectedQuote.customerName}
                                    </h2>
                                    <div className="text-xs text-slate-400 mt-0.5">
                                        {selectedQuote.projectAddress || "Adres belirtilmedi"}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => handleDownloadSavedQuotePdf(selectedQuote)}
                                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold cursor-pointer"
                                    >
                                        PDF İndir
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuote(selectedQuote)}
                                        className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-300 text-xs font-semibold cursor-pointer"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2.5 mb-5">
                                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Teklif Kalemleri ({selectedQuote.items?.length || 0})
                                </div>
                                {selectedQuote.items && selectedQuote.items.length > 0 ? (
                                    selectedQuote.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                                        >
                                            <span className="text-slate-200 leading-relaxed">
                                                {item.description}
                                            </span>
                                            <span className="text-white font-bold whitespace-nowrap">
                                                {formatCurrency(item.price)} ₺
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-slate-500">Kalem bilgisi yok.</div>
                                )}
                            </div>

                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 mb-4">
                                <span className="text-xs font-semibold text-slate-400">
                                    Toplam (+KDV)
                                </span>
                                <span className="text-lg font-bold text-white">
                                    {formatCurrency(selectedQuote.total)} ₺
                                </span>
                            </div>

                            {selectedQuote.notes && (
                                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 mb-4">
                                    <span className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
                                        Notlar
                                    </span>
                                    {selectedQuote.notes}
                                </div>
                            )}

                            <div className="text-[11px] text-slate-500">
                                Geçerlilik: {selectedQuote.validityDays} gün • Oluşturulma:{" "}
                                {new Date(selectedQuote.createdAt).toLocaleString("tr-TR")}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 py-10 text-sm">
                            Kalem detaylarını incelemek için tablodan bir teklif seçin.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
