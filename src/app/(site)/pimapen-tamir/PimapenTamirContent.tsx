"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import FreeInspection from "@/components/seo/FreeInspection";
import WarrantyProcess from "@/components/seo/WarrantyProcess";

export default function PimapenTamirContent() {
    const { t, language } = useLanguage();
    const p = t.pages.pimapen;

    const whatsappText =
        language === "de"
            ? "Hallo, ich benötige Unterstützung bei PVC-Fenstern oder Reparaturen."
            : language === "en"
            ? "Hello, I need assistance with PVC windows or joinery repair."
            : "Merhaba, pimapen tamir ve bakım hizmeti almak istiyorum.";

    const services = [
        {
            title: p.s1_t,
            description: p.s1_d,
            icon: "🪟",
        },
        {
            title: p.s2_t,
            description: p.s2_d,
            icon: "❄️",
        },
        {
            title: p.s3_t,
            description: p.s3_d,
            icon: "🔧",
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/pimapen-hero.png"
                        alt="PVC Joinery & Repair"
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

            {/* Services */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((s, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[var(--primary)]/30 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{s.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {s.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>
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
