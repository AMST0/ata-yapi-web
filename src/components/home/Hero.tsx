"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    poster="/hero-balcony.png"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/40" />
            </div>

            {/* Animated Accent Lines */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                <div className="absolute top-1/4 right-0 w-96 h-1 bg-gradient-to-l from-[var(--primary)] to-transparent animate-fade-in" />
                <div className="absolute top-1/3 right-0 w-72 h-1 bg-gradient-to-l from-[var(--secondary)] to-transparent animate-fade-in-delay-1" />
                <div className="absolute top-1/2 right-0 w-80 h-1 bg-gradient-to-l from-[var(--accent)] to-transparent animate-fade-in-delay-2" />
            </div>

            <div className="container relative z-10">
                <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 mb-6 animate-fade-in">
                        <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                        {t.hero.badge}
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-delay-1" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t.hero.title_prefix}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]">
                            {t.hero.title_highlight}
                        </span>{" "}
                        {t.hero.title_suffix}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in-delay-2">
                        {t.hero.subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 animate-fade-in-delay-3">
                        <Link
                            href="/iletisim"
                            className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            {t.hero.cta_quote}
                        </Link>
                        <a
                            href="https://wa.me/905314002959"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-press inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-green-500/20"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {t.hero.cta_whatsapp}
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-[var(--accent)]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span>{t.nav.free_discovery}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-[var(--accent)]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span>{t.hero.stat_warranty}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-[var(--accent)]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span>{t.common.factory_direct}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
