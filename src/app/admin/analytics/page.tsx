"use client";

import { useEffect, useState } from "react";

interface Stats {
    totalVisitors: number;
    todayVisitors: number;
    totalPageViews: number;
    pageViews: Record<string, number>;
    browsers: Record<string, number>;
    devices: Record<string, number>;
    cities?: Record<string, number>;
}

export default function AnalyticsPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/track", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch stats");
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Error fetching stats:", err);
                setError("İstatistikler yüklenirken hata oluştu.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Analitik verileri yükleniyor...</p>
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

    const maxPageViews = stats?.pageViews ? Math.max(...Object.values(stats.pageViews), 1) : 1;

    return (
        <div className="space-y-6">
            <div>
                <h1
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Trafik Analitiği
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Sayfa görüntüleme dağılımı, cihaz oranları ve bölgesel erişim metrikleri.
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard label="Toplam Ziyaretçi" value={stats?.totalVisitors || 0} />
                <MetricCard label="Toplam Sayfa Gösterimi" value={stats?.totalPageViews || 0} />
                <MetricCard label="Bugünkü Ziyaretçi" value={stats?.todayVisitors || 0} />
                <MetricCard
                    label="Aktif Sayfa Sayısı"
                    value={stats?.pageViews ? Object.keys(stats.pageViews).length : 0}
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Page Views */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
                    <h2 className="text-base sm:text-lg font-bold text-white mb-5">
                        Sayfa Görüntülemeleri
                    </h2>
                    <div className="space-y-3.5">
                        {stats?.pageViews && Object.keys(stats.pageViews).length > 0 ? (
                            Object.entries(stats.pageViews)
                                .sort(([, a], [, b]) => b - a)
                                .map(([page, count]) => {
                                    const percentage = (count / (stats?.totalPageViews || 1)) * 100;
                                    return (
                                        <div key={page}>
                                            <div className="flex justify-between text-xs sm:text-sm mb-1.5 gap-2">
                                                <span className="text-white font-mono truncate">{page}</span>
                                                <span className="text-slate-400 shrink-0">
                                                    {count} ({percentage.toFixed(1)}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-800 rounded-full h-2">
                                                <div
                                                    className="bg-[var(--primary)] h-2 rounded-full transition-all"
                                                    style={{ width: `${(count / maxPageViews) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="text-center py-8 text-slate-500 text-sm">
                                Henüz sayfa görüntüleme verisi yok.
                            </div>
                        )}
                    </div>
                </div>

                {/* Browser Distribution */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
                    <h2 className="text-base sm:text-lg font-bold text-white mb-5">
                        Tarayıcı Dağılımı
                    </h2>
                    <div className="space-y-4">
                        {stats?.browsers && Object.keys(stats.browsers).length > 0 ? (
                            Object.entries(stats.browsers).map(([browser, count]) => {
                                const percentage = Math.round(
                                    (count / Math.max(stats?.totalVisitors || 1, 1)) * 100
                                );
                                return (
                                    <div key={browser} className="space-y-1.5">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white font-medium">{browser}</span>
                                            <span className="text-xs text-slate-400">
                                                {percentage}% ({count})
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 text-slate-500 text-sm">
                                Henüz tarayıcı verisi yok.
                            </div>
                        )}
                    </div>
                </div>

                {/* Device Distribution */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
                    <h2 className="text-base sm:text-lg font-bold text-white mb-5">
                        Cihaz Dağılımı
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {stats?.devices && Object.keys(stats.devices).length > 0 ? (
                            Object.entries(stats.devices).map(([device, count]) => {
                                const percentage = Math.round(
                                    (count / Math.max(stats?.totalVisitors || 1, 1)) * 100
                                );
                                return (
                                    <div
                                        key={device}
                                        className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center"
                                    >
                                        <div className="text-2xl font-bold text-white">{percentage}%</div>
                                        <div className="text-xs font-semibold text-slate-300 mt-1">{device}</div>
                                        <div className="text-[11px] text-slate-500 mt-0.5">{count} ziyaretçi</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="sm:col-span-3 text-center py-8 text-slate-500 text-sm">
                                Henüz cihaz verisi yok.
                            </div>
                        )}
                    </div>
                </div>

                {/* Cities Distribution */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
                    <h2 className="text-base sm:text-lg font-bold text-white mb-5">
                        Şehir Dağılımı
                    </h2>
                    <div className="space-y-2.5">
                        {stats?.cities && Object.keys(stats.cities).length > 0 ? (
                            Object.entries(stats.cities)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 8)
                                .map(([city, count]) => {
                                    const percentage = Math.round(
                                        (count / Math.max(stats?.totalVisitors || 1, 1)) * 100
                                    );
                                    return (
                                        <div
                                            key={city}
                                            className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm"
                                        >
                                            <span className="text-white font-medium">{city || "Bilinmiyor"}</span>
                                            <span className="text-xs text-slate-400">
                                                {count} ziyaretçi ({percentage}%)
                                            </span>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="text-center py-8 text-slate-500 text-sm">
                                Henüz konum verisi yok.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5">
            <div className="text-2xl sm:text-3xl font-bold text-white">
                {value.toLocaleString("tr-TR")}
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-0.5">{label}</div>
        </div>
    );
}
