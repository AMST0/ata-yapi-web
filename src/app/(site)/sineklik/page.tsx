import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sineklik Sistemleri | Ata Yapı Maltepe",
    description:
        "Maltepe'de plise, menteşeli ve sürme sineklik sistemleri. Haşerelerden korunarak temiz hava alın.",
};

const sineklikTypes = [
    {
        title: "Plise Sineklik",
        description:
            "Akordiyon tarzı katlanan sineklik. Kullanılmadığında minimal yer kaplar, şık görünüm.",
        features: ["Minimal alan kullanımı", "Modern görünüm", "Kolay kullanım", "Geniş açıklıklar için ideal"],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z" />
                <path d="M4 8h16" />
                <path d="M4 12h16" />
                <path d="M4 16h16" />
            </svg>
        ),
    },
    {
        title: "Menteşeli Sineklik",
        description:
            "Kapı gibi açılıp kapanan sineklik. Sık giriş-çıkış yapılan kapılar için uygundur.",
        features: ["Kapı tipi açılış", "Dayanıklı menteşeler", "Sık kullanım için ideal", "Kolay geçiş"],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 12h4" />
                <circle cx="5" cy="8" r="1" />
                <circle cx="5" cy="16" r="1" />
            </svg>
        ),
    },
    {
        title: "Sürme Sineklik",
        description:
            "Ray üzerinde kayan sineklik. Balkon ve geniş kapılar için ekonomik çözüm.",
        features: ["Ekonomik fiyat", "Kolay montaj", "Ray sistemi", "Geniş açıklıklar"],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="15" y1="3" x2="15" y2="21" />
                <path d="M15 12l3 0" />
            </svg>
        ),
    },
];

const benefits = [
    "Haşerelerden tam koruma",
    "Temiz hava sirkülasyonu",
    "UV korumalı seçenekler",
    "Kolay temizlik",
    "Uzun ömürlü kullanım",
    "Estetik görünüm",
];

export default function SineklikPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="container relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3 animate-fade-in">
                            Hizmetlerimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-delay-1" style={{ fontFamily: 'var(--font-heading)' }}>
                            Sineklik{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)]">
                                Sistemleri
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-delay-2">
                            Plise, menteşeli ve sürme sineklik seçenekleri ile haşerelerden
                            korunarak temiz hava alın. Her pencere ve kapı tipine uygun çözümler.
                        </p>
                        <Link
                            href="/iletisim"
                            className="btn-press inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-colors animate-fade-in-delay-3"
                        >
                            Ücretsiz Keşif
                        </Link>
                    </div>
                </div>
            </section>

            {/* Types */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Sineklik Çeşitlerimiz
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Her ihtiyaca uygun sineklik modelleri sunuyoruz.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {sineklikTypes.map((type, index) => (
                            <div
                                key={index}
                                className="card-hover p-8 bg-white rounded-2xl border border-gray-100 shadow-sm"
                            >
                                <div className="w-16 h-16 flex items-center justify-center bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-2xl mb-6">
                                    {type.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {type.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{type.description}</p>
                                <ul className="space-y-2">
                                    {type.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 lg:py-28 bg-gray-50">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                Sineklik Sistemlerinin Avantajları
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Kaliteli sineklik sistemleri ile evinizi haşerelerden koruyun,
                                sağlıklı bir yaşam alanı oluşturun.
                            </p>
                            <ul className="grid grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 flex items-center justify-center bg-[var(--accent)] text-white rounded-full shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--accent)]/10 rounded-3xl p-12 text-center">
                            <div className="text-6xl font-bold text-[var(--secondary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                100%
                            </div>
                            <div className="text-xl font-semibold text-gray-900 mb-2">
                                Koruma Garantisi
                            </div>
                            <p className="text-gray-600">
                                Tüm sineklik sistemlerimiz tam koruma sağlar
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-[var(--secondary)]">
                <div className="container text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Sineklik İhtiyacınız mı Var?
                    </h2>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">
                        Ücretsiz keşif ile size en uygun sineklik sistemini belirleyelim.
                    </p>
                    <Link
                        href="/iletisim"
                        className="btn-press inline-flex items-center gap-2 bg-white text-[var(--secondary)] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
                    >
                        Hemen Randevu Alın
                    </Link>
                </div>
            </section>
        </>
    );
}
