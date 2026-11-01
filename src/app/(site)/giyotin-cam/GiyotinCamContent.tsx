"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import FreeInspection from "@/components/seo/FreeInspection";
import WarrantyProcess from "@/components/seo/WarrantyProcess";

export default function GiyotinCamContent() {
    const { t, language } = useLanguage();
    const p = t.pages.giyotin;

    const whatsappText =
        language === "de"
            ? "Hallo, ich interessiere mich für motorisierte Guillotine-Glassysteme."
            : language === "en"
            ? "Hello, I am inquiring about motorized guillotine glass systems."
            : "Merhaba, giyotin cam sistemi hakkında bilgi almak istiyorum.";

    const subCategories = [
        {
            title: p.sub1_t,
            description: p.sub1_d,
            href: "/giyotin-cam/motorlu",
            badge: language === "de" ? "Automation" : language === "en" ? "Automation" : "Otomasyon",
            icon: "⚡",
        },
        {
            title: p.sub2_t,
            description: p.sub2_d,
            href: "/giyotin-cam/uygulamalar",
            badge: language === "de" ? "Gewerbe & Wohnbau" : language === "en" ? "Commercial & Home" : "Ticari & Konut",
            icon: "🏢",
        },
        {
            title: p.sub3_t,
            description: p.sub3_d,
            href: "/giyotin-cam/imalat",
            badge: t.common.factory_direct,
            icon: "🔧",
        },
    ];

    const features = [
        {
            title: p.f1_t,
            description: p.f1_d,
            icon: "↕️",
        },
        {
            title: p.f2_t,
            description: p.f2_d,
            icon: "🌅",
        },
        {
            title: p.f3_t,
            description: p.f3_d,
            icon: "🛡️",
        },
        {
            title: p.f4_t,
            description: p.f4_d,
            icon: "✨",
        },
    ];

    const usageAreas = [
        { title: p.a1_t, description: p.a1_d, icon: "🏢" },
        { title: p.a2_t, description: p.a2_d, icon: "☕" },
        { title: p.a3_t, description: p.a3_d, icon: "🏡" },
        { title: p.a4_t, description: p.a4_d, icon: "🌿" },
    ];

    const gallery = [
        { src: "/giyotin-cam-hero.png", alt: "Guillotine Glass" },
        { src: "/giyotin-cam-service.png", alt: "Modern Glass Application" },
        { src: "/giyotin-cam-detail.png", alt: "Detail View" },
        { src: "/giyotin-cam-terrace.png", alt: "Terrace Glass Solution" },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/giyotin-cam-hero.png"
                        alt="Guillotine Glass Systems"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-gray-400">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        {t.common.back}
                                    </Link>
                                </li>
                                <li><span className="mx-1">/</span></li>
                                <li className="text-white font-medium">{p.hero_title}</li>
                            </ol>
                        </nav>

                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            {p.hero_badge}
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {p.hero_title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            {p.hero_desc}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                {t.nav.free_discovery}
                            </Link>
                            <a
                                href={`https://wa.me/905314002959?text=${encodeURIComponent(whatsappText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/25"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sub Categories */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        {subCategories.map((sub, index) => (
                            <Link
                                key={index}
                                href={sub.href}
                                className="group block bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[var(--primary)]/30 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">{sub.icon}</span>
                                    <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                                        {sub.badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                                    {sub.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{sub.description}</p>
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
                                    {t.services.explore_button} →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            {p.feat_title}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feat, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                                <div className="text-4xl mb-4">{feat.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{feat.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Usage Areas */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            {p.areas_title}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {usageAreas.map((area, index) => (
                            <div key={index} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <div className="text-4xl mb-4">{area.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {gallery.map((item, index) => (
                            <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Free Inspection and Warranty blocks */}
            <FreeInspection />
            <WarrantyProcess />

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                        {t.shared.cta_title}
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                        {t.shared.cta_desc}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/iletisim"
                            className="btn-press bg-white text-[var(--primary)] hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl"
                        >
                            {t.shared.cta_form}
                        </Link>
                        <a
                            href={`https://wa.me/905314002959?text=${encodeURIComponent(whatsappText)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-press bg-[#25D366] text-white hover:bg-[#20BD5A] px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl"
                        >
                            WhatsApp (+90 531 400 29 59)
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
