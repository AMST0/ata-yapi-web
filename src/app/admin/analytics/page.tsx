"use client";

import { useMemo } from "react";
import { generateMockVisitors, getStats } from "@/lib/visitor-store";

export default function AnalyticsPage() {
    // Generate data once on mount
    const visitors = useMemo(() => generateMockVisitors(), []);
    const stats = useMemo(() => getStats(visitors), [visitors]);

    // Calculate daily visits for last 7 days
    const getDailyVisits = () => {
        const days: Record<string, number> = {};
        const now = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const key = date.toLocaleDateString("tr-TR", { weekday: "short" });
            days[key] = 0;
        }

        visitors.forEach((v) => {
            const visitDate = new Date(v.lastVisit);
            const daysDiff = Math.floor((now.getTime() - visitDate.getTime()) / 86400000);
            if (daysDiff < 7) {
                const key = visitDate.toLocaleDateString("tr-TR", { weekday: "short" });
                if (days[key] !== undefined) {
                    days[key]++;
                }
            }
        });

        return days;
    };

    const dailyVisits = getDailyVisits();
    const maxDaily = Math.max(...Object.values(dailyVisits), 1);

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard label="Toplam Ziyaretçi" value={stats.totalVisitors} />
                <MetricCard label="Sayfa Görüntüleme" value={stats.totalPageViews} />
                <MetricCard label="Ort. Oturum Süresi" value={`${stats.avgSessionDuration}s`} />
                <MetricCard label="Bugün" value={stats.todayVisitors} />
            </div>

            {/* Daily Chart */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-6">Son 7 Gün</h2>
                <div className="flex items-end justify-between gap-4 h-48">
                    {Object.entries(dailyVisits).map(([day, count]) => (
                        <div key={day} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex flex-col items-center justify-end h-40">
                                <div
                                    className="w-full max-w-12 bg-[var(--primary)] rounded-t"
                                    style={{ height: `${(count / maxDaily) * 100}%`, minHeight: count > 0 ? "8px" : "0" }}
                                />
                            </div>
                            <span className="text-xs text-gray-400">{day}</span>
                            <span className="text-sm text-white font-medium">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Page Views */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Sayfa Görüntülemeleri</h2>
                    <div className="space-y-3">
                        {Object.entries(stats.pageViews)
                            .sort(([, a], [, b]) => b - a)
                            .map(([page, count]) => {
                                const percentage = (count / stats.totalPageViews) * 100;
                                return (
                                    <div key={page}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white">{page}</span>
                                            <span className="text-gray-400">{count} ({percentage.toFixed(1)}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-[var(--secondary)] h-2 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Trafik Kaynakları</h2>
                    <div className="space-y-4">
                        {(() => {
                            const sources: Record<string, number> = {};
                            visitors.forEach((v) => {
                                sources[v.referrer] = (sources[v.referrer] || 0) + 1;
                            });
                            return Object.entries(sources).map(([source, count]) => (
                                <div key={source} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                                        {source === "direct" ? "🔗" : "🔍"}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white">{source === "direct" ? "Doğrudan" : source}</div>
                                        <div className="text-sm text-gray-400">{count} ziyaretçi</div>
                                    </div>
                                    <div className="text-xl font-bold text-white">
                                        {((count / visitors.length) * 100).toFixed(0)}%
                                    </div>
                                </div>
                            ));
                        })()}
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
