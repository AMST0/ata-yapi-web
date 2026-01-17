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
                const res = await fetch('/api/visitors');
                if (!res.ok) throw new Error('Failed to fetch visitors');
                const data = await res.json();
                setVisitors(data.visitors || []);
            } catch (err) {
                console.error('Error fetching visitors:', err);
                setError('Ziyaretçiler yüklenirken hata oluştu');
            } finally {
                setIsLoading(false);
            }
        }

        fetchVisitors();
    }, []);

    const filteredVisitors = visitors.filter(
        (v) =>
            (v.city?.toLowerCase() || '').includes(filter.toLowerCase()) ||
            (v.browser?.toLowerCase() || '').includes(filter.toLowerCase()) ||
            (v.device?.toLowerCase() || '').includes(filter.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Ziyaretçiler yükleniyor...</p>
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
            <h1 className="text-3xl font-bold text-white mb-8">Ziyaretçiler</h1>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Şehir, tarayıcı veya cihaz ara..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full max-w-md px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)]"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Visitor List */}
                <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Konum</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Tarayıcı</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Cihaz</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Sayfalar</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Son Ziyaret</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredVisitors.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                            Henüz ziyaretçi yok
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVisitors.map((visitor) => (
                                        <tr
                                            key={visitor.id}
                                            onClick={() => setSelectedVisitor(visitor)}
                                            className={`cursor-pointer hover:bg-gray-700/50 transition-colors ${selectedVisitor?.id === visitor.id ? "bg-gray-700" : ""
                                                }`}
                                        >
                                            <td className="px-4 py-3">
                                                <div className="text-white">{visitor.city || 'Bilinmiyor'}</div>
                                                <div className="text-xs text-gray-500">{visitor.ip}</div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-300">{visitor.browser || '-'}</td>
                                            <td className="px-4 py-3 text-gray-300">{visitor.device || '-'}</td>
                                            <td className="px-4 py-3 text-gray-300">{visitor.pages?.length || 0}</td>
                                            <td className="px-4 py-3 text-gray-400 text-sm">
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
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    {selectedVisitor ? (
                        <>
                            <h2 className="text-xl font-semibold text-white mb-4">Ziyaretçi Detayı</h2>

                            <div className="space-y-4 mb-6">
                                <DetailRow label="IP Adresi" value={selectedVisitor.ip} />
                                <DetailRow label="Konum" value={`${selectedVisitor.city || 'Bilinmiyor'}, ${selectedVisitor.country || 'Bilinmiyor'}`} />
                                <DetailRow label="Tarayıcı" value={selectedVisitor.browser || '-'} />
                                <DetailRow label="İşletim Sistemi" value={selectedVisitor.os || '-'} />
                                <DetailRow label="Cihaz" value={selectedVisitor.device || '-'} />
                                <DetailRow label="Referrer" value={selectedVisitor.referrer || 'Doğrudan'} />
                                <DetailRow label="Ziyaret Sayısı" value={String(selectedVisitor.visitCount || 1)} />
                                <DetailRow label="İlk Ziyaret" value={new Date(selectedVisitor.firstVisit).toLocaleString("tr-TR")} />
                            </div>

                            <h3 className="text-lg font-medium text-white mb-3">Gezilen Sayfalar</h3>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {selectedVisitor.pages && selectedVisitor.pages.length > 0 ? (
                                    selectedVisitor.pages.map((page, i) => (
                                        <div key={i} className="p-3 bg-gray-700/50 rounded-lg">
                                            <div className="text-white text-sm">{page}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-sm">Sayfa verisi yok</div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Detayları görmek için bir ziyaretçi seçin
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-400 text-sm">{label}</span>
            <span className="text-white text-sm">{value}</span>
        </div>
    );
}
