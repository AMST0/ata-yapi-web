"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function BayiKurumsalContent() {
    const { t, language } = useLanguage();
    const p = t.pages.bayi;

    const whatsappText =
        language === "de"
            ? "Hallo, ich interessiere mich für eine B2B-Händlerpartnerschaft und Großhandelsangebote."
            : language === "en"
            ? "Hello, I am interested in B2B wholesale supply and dealership opportunities."
            : "Merhaba, bayilik ve toptan satış hakkında bilgi almak istiyorum.";

    const partnershipModels = [
        {
            title: p.m1_t,
            description: p.m1_d,
            icon: "📍",
            badge: language === "de" ? "Exklusivität" : language === "en" ? "Exclusivity" : "Bölgesel Yetki",
        },
        {
            title: p.m2_t,
            description: p.m2_d,
            icon: "📦",
            badge: language === "de" ? "Großhandelsrabatte" : language === "en" ? "Wholesale Rates" : "Toptan İskonto",
        },
        {
            title: p.m3_t,
            description: p.m3_d,
            icon: "🏗️",
            badge: language === "de" ? "Objektbau" : language === "en" ? "Commercial Projects" : "Proje Bazlı",
        },
        {
            title: p.m4_t,
            description: p.m4_d,
            icon: "🏢",
            badge: language === "de" ? "Maßanfertigung" : language === "en" ? "Custom OEM" : "Özel İmalat",
        },
    ];

    const advantages = [
        { title: p.adv1_t, description: p.adv1_d, icon: "💰" },
        { title: p.adv2_t, description: p.adv2_d, icon: "🎯" },
        { title: p.adv3_t, description: p.adv3_d, icon: "📦" },
        { title: p.adv4_t, description: p.adv4_d, icon: "⚡" },
        { title: p.adv5_t, description: p.adv5_d, icon: "📚" },
        { title: p.adv6_t, description: p.adv6_d, icon: "🛠️" },
    ];

    const processSteps = [
        { step: 1, title: p.p1_t, description: p.p1_d, icon: "📝" },
        { step: 2, title: p.p2_t, description: p.p2_d, icon: "📊" },
        { step: 3, title: p.p3_t, description: p.p3_d, icon: "📐" },
        { step: 4, title: p.p4_t, description: p.p4_d, icon: "🚀" },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70" />
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
                            <a
                                href="#basvuru"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                {p.form_submit}
                            </a>
                            <a
                                href={`https://wa.me/905314002959?text=${encodeURIComponent(whatsappText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/25"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp B2B
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partnership Models */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            {p.models_title}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            {p.models_title}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {partnershipModels.map((model, index) => (
                            <div key={index} className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-4xl">{model.icon}</div>
                                    <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                                        {model.badge}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                                    {model.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{model.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/10 rounded-full text-sm font-semibold text-[var(--secondary)] mb-4">
                            B2B
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            {p.adv_title}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((item, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-gray-200 border border-transparent transition-all duration-300">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 lg:py-28 bg-gray-900">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            {p.proc_title}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((item) => (
                            <div key={item.step} className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                <div className="text-4xl mb-4 mt-2">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / Application Form CTA */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50" id="basvuru">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            {p.form_title}
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            {p.form_desc}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl shadow-red-500/25"
                            >
                                {t.shared.cta_form}
                            </Link>
                            <a
                                href={`https://wa.me/905314002959?text=${encodeURIComponent(whatsappText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl"
                            >
                                WhatsApp B2B
                            </a>
                        </div>
                        <p className="mt-6 text-gray-500 text-sm">
                            {t.contact.phone_label}: <a href="tel:+905314002959" className="text-[var(--primary)] font-medium hover:underline">+90 531 400 29 59</a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
