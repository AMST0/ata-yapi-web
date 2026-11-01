"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
    badgeKey?: "unread" | "outreach";
    external?: boolean;
}

const navItems: NavItem[] = [
    {
        href: "/admin",
        label: "Genel Bakış",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),
    },
    {
        href: "/admin/messages",
        label: "Müşteri Mesajları",
        badgeKey: "unread",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        href: "/admin/quotes",
        label: "Fiyat Teklifleri",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
    },
    {
        href: "/admin/outreach",
        label: "Avrupa & B2B Mail",
        badgeKey: "outreach",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        href: "/admin/visitors",
        label: "Ziyaretçi Kayıtları",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        href: "/admin/analytics",
        label: "Trafik Analitiği",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
    },
    {
        href: "/teklif",
        label: "PDF Teklif Oluştur",
        external: true,
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
        ),
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [outreachCount, setOutreachCount] = useState<number>(0);

    const isLoginPage = pathname === "/admin/login";

    const refreshCounts = useCallback(async () => {
        try {
            const [msgRes, outRes] = await Promise.allSettled([
                fetch("/api/messages").then((r) => (r.ok ? r.json() : null)),
                fetch("/api/admin/outreach").then((r) => (r.ok ? r.json() : null)),
            ]);
            if (msgRes.status === "fulfilled" && msgRes.value) {
                setUnreadCount(Number(msgRes.value.unreadCount) || 0);
            }
            if (outRes.status === "fulfilled" && outRes.value) {
                setOutreachCount(Array.isArray(outRes.value.contacts) ? outRes.value.contacts.length : 0);
            }
        } catch {
            // Silent ignore on count refresh
        }
    }, []);

    useEffect(() => {
        if (isLoginPage) {
            return;
        }

        let cancelled = false;

        async function checkAuth() {
            try {
                const res = await fetch("/api/admin/auth", { cache: "no-store" });
                const data = await res.json();
                if (cancelled) return;
                if (res.ok && data.authenticated) {
                    setIsAuthenticated(true);
                    refreshCounts();
                } else {
                    setIsAuthenticated(false);
                    router.replace("/admin/login");
                }
            } catch (err) {
                if (cancelled) return;
                console.error("Auth check failed:", err);
                setIsAuthenticated(false);
                router.replace("/admin/login");
            }
        }

        checkAuth();

        const handleCountsEvent = () => {
            refreshCounts();
        };
        window.addEventListener("admin-counts-updated", handleCountsEvent);

        return () => {
            cancelled = true;
            window.removeEventListener("admin-counts-updated", handleCountsEvent);
        };
    }, [isLoginPage, router, refreshCounts]);

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/auth", { method: "DELETE" });
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setIsAuthenticated(false);
            router.replace("/admin/login");
        }
    };

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (isAuthenticated !== true) {
        return (
            <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 font-medium text-sm">Yönetici oturumu doğrulanıyor...</p>
                </div>
            </div>
        );
    }

    const activeNavLabel =
        navItems.find((item) => item.href === pathname)?.label || "Yönetici Paneli";

    const renderSidebarContent = () => (
        <>
            {/* Logo Section */}
            <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Ata Yapı"
                            width={24}
                            height={24}
                            className="brightness-0 invert object-contain"
                        />
                    </div>
                    <div>
                        <div
                            className="text-base font-bold text-white tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            ATA YAPI
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Yönetim Konsolu
                        </div>
                    </div>
                </Link>

                <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    aria-label="Menüyü kapat"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3.5 overflow-y-auto">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em] mb-2.5 px-3.5">
                    Operasyon Menüsü
                </div>
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    target={item.external ? "_blank" : undefined}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 ${
                                        isActive
                                            ? "bg-[var(--primary)] text-white shadow-lg shadow-red-950/40 font-semibold"
                                            : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    <span className="text-sm">{item.label}</span>

                                    {item.badgeKey === "unread" && unreadCount > 0 && (
                                        <span
                                            className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${
                                                isActive
                                                    ? "bg-white text-[var(--primary)]"
                                                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                                            }`}
                                        >
                                            {unreadCount}
                                        </span>
                                    )}

                                    {item.badgeKey === "outreach" && outreachCount > 0 && (
                                        <span
                                            className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                                            }`}
                                        >
                                            {outreachCount}
                                        </span>
                                    )}

                                    {item.external && (
                                        <svg className="w-3.5 h-3.5 ml-auto text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer Actions */}
            <div className="p-3.5 border-t border-slate-800/80 space-y-1.5">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-3.5 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors text-sm"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span className="font-medium">Canlı Siteyi Aç</span>
                </Link>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors text-sm cursor-pointer"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span className="font-medium">Güvenli Çıkış</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-68 bg-slate-950/90 border-r border-slate-800/80 flex-col shrink-0 sticky top-0 h-screen">
                {renderSidebarContent()}
            </aside>

            {/* Mobile Drawer Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div
                        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
                        onClick={() => setMobileOpen(false)}
                    />
                    <aside className="relative z-10 w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 flex flex-col h-full shadow-2xl">
                        {renderSidebarContent()}
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col">
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-[#0b0f19]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileOpen(true)}
                                className="lg:hidden p-2 -ml-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                                aria-label="Menüyü aç"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            </button>

                            <div>
                                <div className="text-white font-semibold text-sm sm:text-base">
                                    {activeNavLabel}
                                </div>
                                <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    Ata Yapı Kurumsal Yönetim
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href="/teklif"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-xs font-semibold transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                <span className="hidden sm:inline">PDF Teklif</span>
                                <span className="sm:hidden">Teklif</span>
                            </Link>

                            <Link
                                href="/admin/outreach"
                                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-medium transition-colors"
                            >
                                <span>İhracat Mailleri ({outreachCount || 16})</span>
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-red-500/15 text-slate-300 hover:text-red-300 border border-slate-800 hover:border-red-500/30 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                                title="Oturumu Kapat"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                <span className="hidden sm:inline">Çıkış</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
            </main>
        </div>
    );
}
