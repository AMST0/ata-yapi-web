"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    {
        href: "/giyotin-cam",
        label: "Giyotin Sistemler",
        children: [
            { href: "/giyotin-cam", label: "Giyotin Cam Sistemleri" },
            { href: "/giyotin-cam/motorlu", label: "Motorlu Giyotin" },
            { href: "/giyotin-cam/uygulamalar", label: "Uygulamalar" },
            { href: "/giyotin-cam/imalat", label: "İmalat & Montaj" },
        ],
    },
    // { href: "/teleskopik-garaj", label: "Teleskopik Garaj" },
    { href: "/cam-balkon", label: "Cam Balkon" },
    {
        href: "#",
        label: "Diğer Hizmetler",
        children: [
            { href: "/sineklik", label: "Sineklik" },
            { href: "/tente", label: "Tente" },
            { href: "/pimapen-tamir", label: "Pimapen" },
        ],
    },
    { href: "/bayi-kurumsal", label: "Bayi & Kurumsal" },
    { href: "/fiyatlandirma", label: "Fiyatlandırma" },
    { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container">
                <nav className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Ata Yapı Logo"
                            width={120}
                            height={48}
                            className="h-10 md:h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li
                                key={link.label}
                                className="relative"
                                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {link.children ? (
                                    <>
                                        <button
                                            className="link-hover flex items-center gap-1 text-gray-700 hover:text-[var(--primary)] font-medium text-sm transition-colors"
                                            aria-expanded={openDropdown === link.label}
                                            aria-haspopup="true"
                                        >
                                            {link.label}
                                            <svg
                                                className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </button>
                                        {/* Dropdown */}
                                        <div
                                            className={`absolute top-full left-0 pt-2 transition-all duration-200 ${openDropdown === link.label
                                                ? "opacity-100 visible translate-y-0"
                                                : "opacity-0 invisible -translate-y-2"
                                                }`}
                                        >
                                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px]">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)] transition-colors"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="link-hover text-gray-700 hover:text-[var(--primary)] font-medium text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA */}
                    <Link
                        href="/iletisim"
                        className="hidden lg:inline-flex btn-press items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Ücretsiz Keşif
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-gray-700"
                        aria-label="Menüyü aç/kapat"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-[600px] pb-4" : "max-h-0"
                        }`}
                >
                    <ul className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                {link.children ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                setOpenMobileAccordion(
                                                    openMobileAccordion === link.label ? null : link.label
                                                )
                                            }
                                            className="w-full flex items-center justify-between py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)] rounded-lg transition-colors"
                                        >
                                            <span>{link.label}</span>
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${openMobileAccordion === link.label ? "rotate-180" : ""
                                                    }`}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </button>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${openMobileAccordion === link.label
                                                ? "max-h-60"
                                                : "max-h-0"
                                                }`}
                                        >
                                            <div className="pl-6 space-y-1 pb-2">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="block py-1.5 px-4 text-sm text-gray-600 hover:text-[var(--primary)] rounded-lg transition-colors"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)] rounded-lg transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/iletisim"
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2.5 px-4 bg-[var(--primary)] text-white text-center rounded-lg font-medium mt-2"
                            >
                                Ücretsiz Keşif
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
