"use client";

import { useEffect, useState } from "react";
import { generateMockVisitors, generateMockMessages, getStats, Visitor, Message } from "@/lib/visitor-store";

export default function AdminDashboard() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);

    useEffect(() => {
        const mockVisitors = generateMockVisitors();
        const mockMessages = generateMockMessages();
        setVisitors(mockVisitors);
        setMessages(mockMessages);
        setStats(getStats(mockVisitors));
    }, []);

    const unreadMessages = messages.filter((m) => !m.read).length;
    const recentVisitors = visitors.slice(0, 5);

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Toplam Ziyaretçi"
                    value={stats?.totalVisitors || 0}
                    icon="👥"
                    color="blue"
                />
                <StatCard
                    title="Bugün"
                    value={stats?.todayVisitors || 0}
                    icon="📅"
                    color="green"
                />
                <StatCard
                    title="Sayfa Görüntüleme"
                    value={stats?.totalPageViews || 0}
                    icon="👁"
                    color="purple"
                />
                <StatCard
                    title="Okunmamış Mesaj"
                    value={unreadMessages}
                    icon="💬"
                    color="red"
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Visitors */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-4">Son Ziyaretçiler</h2>
                    <div className="space-y-3">
                        {recentVisitors.map((visitor) => (
                            <div
                                key={visitor.id}
                                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                            >
                                <div>
                                    <div className="text-white font-medium">{visitor.city}</div>
                                    <div className="text-sm text-gray-400">
                                        {visitor.browser} · {visitor.device}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-300">{visitor.pages.length} sayfa</div>
                                    <div className="text-xs text-gray-500">
                                        {new Date(visitor.lastVisit).toLocaleTimeString("tr-TR")}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Pages */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-4">Popüler Sayfalar</h2>
                    <div className="space-y-3">
                        {stats &&
                            Object.entries(stats.pageViews)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 5)
                                .map(([page, count]) => (
                                    <div
                                        key={page}
                                        className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                                    >
                                        <span className="text-white">{page}</span>
                                        <span className="text-gray-400">{count} görüntüleme</span>
                                    </div>
                                ))}
                    </div>
                </div>

                {/* Browser Distribution */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-4">Tarayıcı Dağılımı</h2>
                    <div className="space-y-3">
                        {stats &&
                            Object.entries(stats.browsers).map(([browser, count]) => (
                                <div key={browser} className="flex items-center gap-3">
                                    <span className="text-white w-20">{browser}</span>
                                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                                        <div
                                            className="bg-[var(--primary)] h-3 rounded-full"
                                            style={{ width: `${(count / stats.totalVisitors) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-gray-400 text-sm w-12 text-right">{count}</span>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Device Distribution */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-4">Cihaz Dağılımı</h2>
                    <div className="space-y-3">
                        {stats &&
                            Object.entries(stats.devices).map(([device, count]) => (
                                <div key={device} className="flex items-center gap-3">
                                    <span className="text-white w-20">{device}</span>
                                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                                        <div
                                            className="bg-[var(--accent)] h-3 rounded-full"
                                            style={{ width: `${(count / stats.totalVisitors) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-gray-400 text-sm w-12 text-right">{count}</span>
                                </div>
                            ))}
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
}: {
    title: string;
    value: number;
    icon: string;
    color: "blue" | "green" | "purple" | "red";
}) {
    const colors = {
        blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
        green: "from-green-500/20 to-green-600/20 border-green-500/30",
        purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
        red: "from-red-500/20 to-red-600/20 border-red-500/30",
    };

    return (
        <div
            className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-6`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{icon}</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-gray-400">{title}</div>
        </div>
    );
}
