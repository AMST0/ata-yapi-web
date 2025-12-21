"use client";

import { useEffect, useState } from "react";
import { generateMockVisitors, Visitor } from "@/lib/visitor-store";

export default function VisitorsPage() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setVisitors(generateMockVisitors());
    }, []);

    const filteredVisitors = visitors.filter(
        (v) =>
            v.city.toLowerCase().includes(filter.toLowerCase()) ||
            v.browser.toLowerCase().includes(filter.toLowerCase()) ||
            v.device.toLowerCase().includes(filter.toLowerCase())
    );

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
                                {filteredVisitors.map((visitor) => (
                                    <tr
                                        key={visitor.id}
                                        onClick={() => setSelectedVisitor(visitor)}
                                        className={`cursor-pointer hover:bg-gray-700/50 transition-colors ${selectedVisitor?.id === visitor.id ? "bg-gray-700" : ""
                                            }`}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="text-white">{visitor.city}</div>
                                            <div className="text-xs text-gray-500">{visitor.ip}</div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-300">{visitor.browser}</td>
                                        <td className="px-4 py-3 text-gray-300">{visitor.device}</td>
                                        <td className="px-4 py-3 text-gray-300">{visitor.pages.length}</td>
                                        <td className="px-4 py-3 text-gray-400 text-sm">
                                            {new Date(visitor.lastVisit).toLocaleString("tr-TR")}
                                        </td>
                                    </tr>
                                ))}
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
                                <DetailRow label="Konum" value={`${selectedVisitor.city}, ${selectedVisitor.country}`} />
                                <DetailRow label="Koordinat" value={`${selectedVisitor.lat?.toFixed(4)}, ${selectedVisitor.lng?.toFixed(4)}`} />
                                <DetailRow label="Tarayıcı" value={selectedVisitor.browser} />
                                <DetailRow label="İşletim Sistemi" value={selectedVisitor.os} />
                                <DetailRow label="Cihaz" value={selectedVisitor.device} />
                                <DetailRow label="Referrer" value={selectedVisitor.referrer} />
                                <DetailRow label="İlk Ziyaret" value={new Date(selectedVisitor.firstVisit).toLocaleString("tr-TR")} />
                            </div>

                            <h3 className="text-lg font-medium text-white mb-3">Gezilen Sayfalar</h3>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {selectedVisitor.pages.map((page, i) => (
                                    <div key={i} className="p-3 bg-gray-700/50 rounded-lg">
                                        <div className="text-white text-sm">{page.title}</div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>{page.path}</span>
                                            <span>{page.duration}s</span>
                                        </div>
                                    </div>
                                ))}
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
