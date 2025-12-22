"use client";

import { useEffect, useState } from "react";

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

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsRes, visitorsRes, messagesRes] = await Promise.all([
                    fetch('/api/track'),
                    fetch('/api/visitors'),
                    fetch('/api/messages'),
                ]);

                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }

                if (visitorsRes.ok) {
                    const visitorsData = await visitorsRes.json();
                    setVisitors(visitorsData.visitors || []);
                }

                if (messagesRes.ok) {
                    const messagesData = await messagesRes.json();
                    setUnreadCount(messagesData.unreadCount || 0);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Veriler yüklenirken bir hata oluştu');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const recentVisitors = visitors.slice(0, 5);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Veriler yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                        Dashboard
                    </h1>
                    <p className="text-gray-400 mt-1">Hoş geldiniz! İşte güncel istatistikleriniz.</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-400">Son Güncelleme</div>
                    <div className="text-white font-medium">{new Date().toLocaleString("tr-TR")}</div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Toplam Ziyaretçi"
                    value={stats?.totalVisitors || 0}
                    icon={<UsersIcon />}
                    color="blue"
                />
                <StatCard
                    title="Bugün"
                    value={stats?.todayVisitors || 0}
                    icon={<CalendarIcon />}
                    color="emerald"
                />
                <StatCard
                    title="Sayfa Görüntüleme"
                    value={stats?.totalPageViews || 0}
                    icon={<EyeIcon />}
                    color="violet"
                />
                <StatCard
                    title="Okunmamış Mesaj"
                    value={unreadCount}
                    icon={<MessageIcon />}
                    color="rose"
                    badge={unreadCount > 0}
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Visitors */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <UsersIcon className="w-5 h-5 text-blue-400" />
                            </span>
                            Son Ziyaretçiler
                        </h2>
                        <a href="/admin/visitors" className="text-sm text-[var(--primary)] hover:underline">Tümünü Gör →</a>
                    </div>
                    <div className="space-y-3">
                        {recentVisitors.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                Henüz ziyaretçi yok
                            </div>
                        ) : (
                            recentVisitors.map((visitor) => (
                                <div
                                    key={visitor.id}
                                    className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-gray-700/30 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                            {(visitor.city || 'U').charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium group-hover:text-[var(--primary)] transition-colors">
                                                {visitor.city || 'Bilinmiyor'}
                                            </div>
                                            <div className="text-sm text-gray-400 flex items-center gap-2">
                                                <span>{visitor.browser || '-'}</span>
                                                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                                <span>{visitor.device || '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-300">{visitor.pages?.length || 0} sayfa</div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(visitor.lastVisit).toLocaleTimeString("tr-TR")}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Popular Pages */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                <ChartIcon className="w-5 h-5 text-violet-400" />
                            </span>
                            Popüler Sayfalar
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {stats?.pageViews && Object.keys(stats.pageViews).length > 0 ? (
                            Object.entries(stats.pageViews)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 5)
                                .map(([page, count]) => {
                                    const maxCount = Math.max(...Object.values(stats.pageViews));
                                    const percentage = (count / maxCount) * 100;
                                    return (
                                        <div
                                            key={page}
                                            className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-gray-700/30"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white font-medium">{page}</span>
                                                <span className="text-sm font-semibold text-violet-400">{count} görüntüleme</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${percentage}%` }}
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
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <GlobeIcon className="w-5 h-5 text-emerald-400" />
                            </span>
                            Tarayıcı Dağılımı
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {stats?.browsers && Object.keys(stats.browsers).length > 0 ? (
                            Object.entries(stats.browsers).map(([browser, count]) => {
                                const percentage = Math.round((count / (stats?.totalVisitors || 1)) * 100);
                                return (
                                    <div key={browser} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-medium">{browser}</span>
                                            <span className="text-sm text-gray-400">{percentage}%</span>
                                        </div>
                                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
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
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                                <DeviceIcon className="w-5 h-5 text-rose-400" />
                            </span>
                            Cihaz Dağılımı
                        </h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {stats?.devices && Object.keys(stats.devices).length > 0 ? (
                            Object.entries(stats.devices).map(([device, count]) => {
                                const percentage = Math.round((count / (stats?.totalVisitors || 1)) * 100);
                                const icons: Record<string, React.ReactNode> = {
                                    Desktop: <DesktopIcon className="w-8 h-8" />,
                                    Mobile: <MobileIcon className="w-8 h-8" />,
                                    Tablet: <TabletIcon className="w-8 h-8" />,
                                };
                                return (
                                    <div
                                        key={device}
                                        className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 text-center hover:border-rose-500/50 transition-all duration-300"
                                    >
                                        <div className="text-rose-400 mb-2 flex justify-center">
                                            {icons[device] || <DeviceIcon className="w-8 h-8" />}
                                        </div>
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
        blue: {
            bg: "from-blue-500/10 to-blue-600/5",
            border: "border-blue-500/20 hover:border-blue-500/40",
            icon: "bg-blue-500/20 text-blue-400",
        },
        emerald: {
            bg: "from-emerald-500/10 to-emerald-600/5",
            border: "border-emerald-500/20 hover:border-emerald-500/40",
            icon: "bg-emerald-500/20 text-emerald-400",
        },
        violet: {
            bg: "from-violet-500/10 to-violet-600/5",
            border: "border-violet-500/20 hover:border-violet-500/40",
            icon: "bg-violet-500/20 text-violet-400",
        },
        rose: {
            bg: "from-rose-500/10 to-rose-600/5",
            border: "border-rose-500/20 hover:border-rose-500/40",
            icon: "bg-rose-500/20 text-rose-400",
        },
    };

    const classes = colorClasses[color];

    return (
        <div className={`relative bg-gradient-to-br ${classes.bg} border ${classes.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg group`}>
            {badge && (
                <span className="absolute top-4 right-4 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
            )}
            <div className={`w-12 h-12 ${classes.icon} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div className="text-4xl font-bold text-white mb-1">{value.toLocaleString("tr-TR")}</div>
            <span className="text-sm text-gray-400">{title}</span>
        </div>
    );
}

// Icon Components
function UsersIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function CalendarIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function EyeIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function MessageIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
}

function ChartIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    );
}

function GlobeIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

function DeviceIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}

function DesktopIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    );
}

function MobileIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}

function TabletIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}
