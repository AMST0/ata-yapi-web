"use client";

import { useLanguage } from "@/lib/i18n";

/**
 * "Neden Ata Yapı?" trust-building content block
 * Reusable across district and service pages
 */
export default function WhyAtaYapi() {
    const { t } = useLanguage();

    const reasons = [
        {
            icon: '🏆',
            title: t.shared.r1_t,
            description: t.shared.r1_d,
        },
        {
            icon: '✅',
            title: t.shared.r2_t,
            description: t.shared.r2_d,
        },
        {
            icon: '📏',
            title: t.shared.r3_t,
            description: t.shared.r3_d,
        },
        {
            icon: '👷',
            title: t.shared.r4_t,
            description: t.shared.r4_d,
        },
        {
            icon: '💰',
            title: t.shared.r5_t,
            description: t.shared.r5_d,
        },
        {
            icon: '🚚',
            title: t.shared.r6_t,
            description: t.shared.r6_d,
        },
    ];

    return (
        <section className="py-16 lg:py-20 bg-gray-50">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {t.shared.why_title}
                    </h2>
                    <p className="text-gray-600">
                        {t.shared.why_subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        >
                            <div className="text-3xl mb-3">{reason.icon}</div>
                            <h3
                                className="font-bold text-gray-900 mb-2"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {reason.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
