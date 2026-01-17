"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | Quote["status"]>("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchQuotes() {
            try {
                const res = await fetch('/api/quotes');
                if (!res.ok) throw new Error('Failed to fetch quotes');
                const data = await res.json();
                setQuotes(data.quotes || []);
            } catch (err) {
                console.error('Error fetching quotes:', err);
                setError('Teklifler yüklenirken hata oluştu');
            } finally {
                setIsLoading(false);
            }
        }

        fetchQuotes();
    }, []);

    const updateStatus = async (id: number, status: Quote["status"]) => {
        try {
            await fetch('/api/quotes', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });
            setQuotes((prev) =>
                prev.map((q) => (q.id === id ? { ...q, status } : q))
            );
        } catch (err) {
            console.error('Error updating quote status:', err);
        }
    };

    const filteredQuotes = quotes.filter((q) => {
        const matchesFilter = filter === "all" || q.status === filter;
        const matchesSearch =
            q.customerName.toLowerCase().includes(search.toLowerCase()) ||
            q.quoteNumber.toLowerCase().includes(search.toLowerCase()) ||
            (q.projectAddress?.toLowerCase() || '').includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status: Quote["status"]) => {
        const styles = {
            draft: "bg-gray-500/20 text-gray-400",
            sent: "bg-blue-500/20 text-blue-400",
            accepted: "bg-green-500/20 text-green-400",
            rejected: "bg-red-500/20 text-red-400",
        };
        const labels = {
            draft: "Taslak",
            sent: "Gönderildi",
            accepted: "Kabul Edildi",
            rejected: "Reddedildi",
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("tr-TR").format(amount);
    };

    const stats = {
        total: quotes.length,
        draft: quotes.filter((q) => q.status === "draft").length,
        sent: quotes.filter((q) => q.status === "sent").length,
        accepted: quotes.filter((q) => q.status === "accepted").length,
        totalValue: quotes.filter((q) => q.status === "accepted").reduce((acc, q) => acc + q.total, 0),
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Teklifler yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                    <p className="text-red-400">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                        Tekrar Dene
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Teklifler</h1>
                <Link
                    href="/teklif"
                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Yeni Teklif
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                    <div className="text-sm text-gray-400">Toplam Teklif</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="text-2xl font-bold text-blue-400">{stats.sent}</div>
                    <div className="text-sm text-gray-400">Gönderildi</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="text-2xl font-bold text-green-400">{stats.accepted}</div>
                    <div className="text-sm text-gray-400">Kabul Edildi</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="text-2xl font-bold text-[var(--accent)]">{formatCurrency(stats.totalValue)} ₺</div>
                    <div className="text-sm text-gray-400">Toplam Değer</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Ara (müşteri adı, teklif no...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 min-w-[200px] px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)]"
                />
                <div className="flex gap-2">
                    {(["all", "draft", "sent", "accepted", "rejected"] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                ? "bg-[var(--primary)] text-white"
                                : "bg-gray-800/50 text-gray-400 hover:text-white"
                                }`}
                        >
                            {status === "all" ? "Tümü" : status === "draft" ? "Taslak" : status === "sent" ? "Gönderildi" : status === "accepted" ? "Kabul" : "Red"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quotes Table */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-900/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Teklif No</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Müşteri</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Proje</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Tutar</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Durum</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Tarih</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {filteredQuotes.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                        Henüz teklif yok
                                    </td>
                                </tr>
                            ) : (
                                filteredQuotes.map((quote) => (
                                    <tr key={quote.id} className="hover:bg-gray-700/30 transition-colors">
                                        <td className="px-4 py-3 text-white font-medium">{quote.quoteNumber}</td>
                                        <td className="px-4 py-3">
                                            <div className="text-white">{quote.customerName}</div>
                                            <div className="text-xs text-gray-500">{quote.customerPhone}</div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-300">{quote.projectAddress || '-'}</td>
                                        <td className="px-4 py-3 text-white font-medium">{formatCurrency(quote.total)} ₺</td>
                                        <td className="px-4 py-3">{getStatusBadge(quote.status)}</td>
                                        <td className="px-4 py-3 text-gray-400 text-sm">
                                            {new Date(quote.createdAt).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        const phone = quote.customerPhone.replace(/\D/g, "");
                                                        const formattedPhone = phone.startsWith("90") ? phone : `90${phone}`;
                                                        const message = `Sayın ${quote.customerName}, ATA YAPI olarak hazırladığımız ${quote.quoteNumber} numaralı teklifiniz için teşekkür ederiz. Toplam: ${formatCurrency(quote.total)} ₺ + KDV`;
                                                        window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, "_blank");
                                                        if (quote.status === 'draft') {
                                                            updateStatus(quote.id, 'sent');
                                                        }
                                                    }}
                                                    className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                                                    title="WhatsApp ile Gönder"
                                                >
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                                    </svg>
                                                </button>
                                                <select
                                                    value={quote.status}
                                                    onChange={(e) => updateStatus(quote.id, e.target.value as Quote["status"])}
                                                    className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white"
                                                >
                                                    <option value="draft">Taslak</option>
                                                    <option value="sent">Gönderildi</option>
                                                    <option value="accepted">Kabul</option>
                                                    <option value="rejected">Red</option>
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
        </div>
    );
}
