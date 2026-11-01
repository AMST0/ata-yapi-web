"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import FreeInspection from "@/components/seo/FreeInspection";
import WarrantyProcess from "@/components/seo/WarrantyProcess";

export default function CamBalkonContent() {
    const { t, language } = useLanguage();
    const p = t.pages.cam_balkon;

    const whatsappText =
        language === "de"
            ? "Hallo, ich interessiere mich für Balkonverglasungssysteme."
            : language === "en"
            ? "Hello, I am inquiring about glass balcony systems."
            : "Merhaba, cam balkon sistemleri hakkında bilgi almak istiyorum.";

    const systems = [
        {
            title: p.s1_t,
            description: p.s1_d,
            href: "/cam-balkon/katlanir",
            icon: "🪟",
        },
        {
            title: p.s2_t,
            description: p.s2_d,
            href: "/cam-balkon/surme",
            icon: "↔️",
        },
        {
            title: p.s3_t,
            description: p.s3_d,
            href: "/cam-balkon/isi-camli",
            icon: "❄️",
        },
    ];

    const advantages = [
        { title: p.adv1_t, description: p.adv1_d, icon: "🌤️" },
        { title: p.adv2_t, description: p.adv2_d, icon: "⚙️" },
        { title: p.adv3_t, description: p.adv3_d, icon: "💎" },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/cam-balkon-1.png"
                        alt="Glass Balcony Systems"
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
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg"
                            >
                                {t.nav.free_discovery}
                            </Link>
                            <a
                                href={`https://wa.me/905314002959?text=${encodeURIComponent(whatsappText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Systems */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        {systems.map((s, idx) => (
                            <Link
                                key={idx}
                                href={s.href}
                                className="group block bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[var(--primary)]/30 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{s.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                                    {s.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
                                    {t.services.explore_button} →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            {p.adv_title}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {advantages.map((adv, idx) => (
                            <div key={idx} className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="text-4xl mb-4">{adv.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{adv.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{adv.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FreeInspection />
            <WarrantyProcess />
        </>
    );
}
