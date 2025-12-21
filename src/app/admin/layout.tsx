"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/50 flex flex-col">
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-800/50">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/20 group-hover:shadow-[var(--primary)]/40 transition-shadow">
                            <Image
                                src="/logo.png"
                                alt="Ata Yapı"
                                width={24}
                                height={24}
                                className="brightness-0 invert"
                            />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                ATA YAPI
                            </div>
                            <div className="text-xs text-gray-500 font-medium tracking-wide">
                                Admin Panel
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
                        Ana Menü
                    </div>
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                                ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30"
                                                : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                                            }`}
                                    >
                                        <span className={`transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}>
                                            {item.icon}
                                        </span>
                                        <span className="font-medium">{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-auto w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800/50">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
                    >
                        <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span className="font-medium">Siteye Dön</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Top Bar */}
                <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold">
                                A
                            </div>
                            <div>
                                <div className="text-white font-medium">Admin</div>
                                <div className="text-xs text-gray-500">Yönetici</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
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
