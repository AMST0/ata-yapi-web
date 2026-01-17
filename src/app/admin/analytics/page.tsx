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
                const res = await fetch('/api/track');
                if (!res.ok) throw new Error('Failed to fetch stats');
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error('Error fetching stats:', err);
                setError('İstatistikler yüklenirken hata oluştu');
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
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Analytics yükleniyor...</p>
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

    const maxPageViews = stats?.pageViews ? Math.max(...Object.values(stats.pageViews), 1) : 1;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard label="Toplam Ziyaretçi" value={stats?.totalVisitors || 0} />
                <MetricCard label="Sayfa Görüntüleme" value={stats?.totalPageViews || 0} />
                <MetricCard label="Bugün" value={stats?.todayVisitors || 0} />
                <MetricCard label="Tarayıcı Çeşidi" value={stats?.browsers ? Object.keys(stats.browsers).length : 0} />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Page Views */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Sayfa Görüntülemeleri</h2>
                    <div className="space-y-3">
                        {stats?.pageViews && Object.keys(stats.pageViews).length > 0 ? (
                            Object.entries(stats.pageViews)
                                .sort(([, a], [, b]) => b - a)
                                .map(([page, count]) => {
                                    const percentage = (count / (stats?.totalPageViews || 1)) * 100;
                                    return (
                                        <div key={page}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-white">{page}</span>
                                                <span className="text-gray-400">{count} ({percentage.toFixed(1)}%)</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-[var(--secondary)] h-2 rounded-full"
                                                    style={{ width: `${(count / maxPageViews) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Henüz sayfa görüntüleme yok
                            </div>
                        )}
                    </div>
                </div>

                {/* Browser Distribution */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Tarayıcı Dağılımı</h2>
                    <div className="space-y-4">
                        {stats?.browsers && Object.keys(stats.browsers).length > 0 ? (
                            Object.entries(stats.browsers).map(([browser, count]) => {
                                const percentage = Math.round((count / (stats?.totalVisitors || 1)) * 100);
                                return (
                                    <div key={browser} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-medium">{browser}</span>
                                            <span className="text-sm text-gray-400">{percentage}% ({count})</span>
                                        </div>
                                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Henüz veri yok
                            </div>
                        )}
                    </div>
                </div>

                {/* Device Distribution */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Cihaz Dağılımı</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {stats?.devices && Object.keys(stats.devices).length > 0 ? (
                            Object.entries(stats.devices).map(([device, count]) => {
                                const percentage = Math.round((count / (stats?.totalVisitors || 1)) * 100);
                                return (
                                    <div
                                        key={device}
                                        className="p-4 bg-gray-700/50 rounded-xl border border-gray-600/30 text-center"
                                    >
                                        <div className="text-2xl font-bold text-white">{percentage}%</div>
                                        <div className="text-sm text-gray-400">{device}</div>
                                        <div className="text-xs text-gray-500 mt-1">{count} kullanıcı</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-3 text-center py-8 text-gray-500">
                                Henüz veri yok
                            </div>
                        )}
                    </div>
                </div>

                {/* Cities Distribution */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Şehir Dağılımı</h2>
                    <div className="space-y-3">
                        {stats?.cities && Object.keys(stats.cities).length > 0 ? (
                            Object.entries(stats.cities)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 5)
                                .map(([city, count]) => {
                                    const percentage = Math.round((count / (stats?.totalVisitors || 1)) * 100);
                                    return (
                                        <div key={city} className="flex items-center justify-between">
                                            <span className="text-white">{city || 'Bilinmiyor'}</span>
                                            <span className="text-gray-400">{count} ({percentage}%)</span>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Henüz konum verisi yok
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value }: { label: string; value: number | string }) {
    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-gray-400">{label}</div>
        </div>
    );
}
