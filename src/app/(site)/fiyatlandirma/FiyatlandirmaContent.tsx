"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function FiyatlandirmaContent() {
    const { t, language } = useLanguage();
    const p = t.pages.fiyat;

    const factors = [
        { title: p.fact1_t, description: p.fact1_d, icon: "📐" },
        { title: p.fact2_t, description: p.fact2_d, icon: "⚡" },
        { title: p.fact3_t, description: p.fact3_d, icon: "🛡️" },
    ];

    const whatsappText =
        language === "de"
            ? "Hallo, ich möchte ein Preisangebot für meine Glassysteme anfordern."
            : language === "en"
            ? "Hello, I would like to request a quotation for my project dimensions."
            : "Merhaba, projem için fiyat teklifi almak istiyorum.";

    return (
        <>
            <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-2xl">
                        <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3 block">
                            {t.nav.fiyatlandirma}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            {p.hero_title}
                        </h1>
                        <p className="text-lg text-gray-300 mb-8">
                            {p.hero_desc}
                        </p>
                        <Link href="/iletisim" className="btn-press inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold">
                            {t.nav.get_quote}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.shared.price_why_title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t.shared.price_why_note}
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-8 text-center max-w-2xl mx-auto border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            📏 {p.calc_box_title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {p.calc_box_desc}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/iletisim" className="btn-press bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-medium">
                                {t.shared.cta_form}
                            </Link>
                            <a
                                href={`https://wa.me/905314002959?text=${encodeURIComponent(whatsappText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press bg-[#25D366] text-white px-6 py-3 rounded-xl font-medium"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                        {p.factors_title}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {factors.map((f, i) => (
                            <div key={i} className="card-hover p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <div className="text-3xl mb-3">{f.icon}</div>
                                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-[var(--primary)]">
                <div className="container text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {t.shared.cta_title}
                    </h2>
                    <p className="text-white/80 max-w-xl mx-auto mb-8">
                        {t.shared.cta_desc}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/iletisim" className="btn-press bg-white text-[var(--primary)] px-8 py-4 rounded-xl font-semibold">
                            {t.shared.cta_form}
                        </Link>
                        <a
                            href={`https://wa.me/905314002959?text=${encodeURIComponent(whatsappText)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-press bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold"
                        >
                            WhatsApp (+90 531 400 29 59)
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
