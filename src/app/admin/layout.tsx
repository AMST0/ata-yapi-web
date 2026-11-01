"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
    {
        href: "/admin",
        label: "Dashboard",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        )
    },
    {
        href: "/admin/outreach",
        label: "Avrupa Mailleri",
        badgeText: "16",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        )
    },
    {
        href: "/admin/visitors",
        label: "Ziyaretçiler",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        href: "/admin/analytics",
        label: "Analytics",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        )
    },
    {
        href: "/admin/messages",
        label: "Mesajlar",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        badge: true
    },
    {
        href: "/admin/quotes",
        label: "Teklifler",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        )
    },
    {
        href: "/teklif",
        label: "Yeni Teklif Formu",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
        ),
        external: true
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

    // If on login page, skip dashboard shell immediately
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (isLoginPage) {
            setIsAuthenticated(true);
            return;
        }

        // Fast client cookie check first
        const hasSessionCookie = typeof document !== "undefined" && document.cookie.includes("admin_session=authenticated_admin");

        if (hasSessionCookie) {
            setIsAuthenticated(true);
            return;
        }

        // Verify with server
        async function checkAuth() {
            try {
                const res = await fetch("/api/admin/auth");
                const data = await res.json();
                if (data.authenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.replace("/admin/login");
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                setIsAuthenticated(false);
                router.replace("/admin/login");
            }
        }

        checkAuth();
    }, [pathname, isLoginPage, router]);

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/auth", { method: "DELETE" });
            document.cookie = "admin_session=; path=/; max-age=0";
            router.replace("/admin/login");
        } catch (err) {
            console.error("Logout error:", err);
            router.replace("/admin/login");
        }
    };

    // If on login page, just render children directly
    if (isLoginPage) {
        return <>{children}</>;
    }

    // While verifying authentication, render a clean loading gate
    if (isAuthenticated === null || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 font-medium text-sm">Yönetici yetkisi doğrulanıyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-gray-900/60 backdrop-blur-xl border-r border-gray-800/60 flex flex-col shrink-0">
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-800/60">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/20 group-hover:shadow-[var(--primary)]/40 transition-shadow">
                            <Image
                                src="/logo.png"
                                alt="Ata Yapı"
                                width={24}
                                height={24}
                                className="brightness-0 invert object-contain"
                            />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                ATA YAPI
                            </div>
                            <div className="text-xs text-gray-400 font-medium tracking-wide flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Admin Panel
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
                        Yönetim Menüsü
                    </div>
                    <ul className="space-y-1.5">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                            ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30 font-semibold"
                                            : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                                            }`}
                                    >
                                        <span className={`transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}>
                                            {item.icon}
                                        </span>
                                        <span className="font-medium text-sm">{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-auto w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                                        )}
                                        {item.badgeText && (
                                            <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                                                {item.badgeText}
                                            </span>
                                        )}
                                        {item.external && (
                                            <svg className="w-3.5 h-3.5 ml-auto text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <div className="p-4 border-t border-gray-800/60 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group text-sm"
                    >
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span className="font-medium">Siteyi Görüntüle</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 group text-sm cursor-pointer"
                    >
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span className="font-medium">Çıkış Yap</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto min-w-0">
                {/* Top Bar */}
                <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/60 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[var(--primary)]/30">
                                AY
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">Yönetici Paneli</div>
                                <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Oturum Aktif
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/outreach"
                                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium hover:bg-blue-500/20 transition-colors"
                            >
                                <span>🌐 16 Avrupa Maili Aktif</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="px-3 py-1.5 rounded-xl bg-gray-800/60 hover:bg-red-500/20 text-gray-300 hover:text-red-300 border border-gray-700/50 hover:border-red-500/30 text-xs font-medium transition-colors flex items-center gap-1.5"
                                title="Oturumu Kapat"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                <span>Çıkış</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
