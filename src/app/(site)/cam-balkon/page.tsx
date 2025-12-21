import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cam Balkon Sistemleri | Ata Yapı Maltepe",
    description:
        "Maltepe'de katlanır ve sürme cam balkon sistemleri. Ata Yapı ile ölçüye özel, kaliteli cam balkon uygulamaları.",
};

const features = [
    {
        title: "Katlanır Cam Balkon",
        description:
            "Panellerin kolayca katlanarak toplanabildiği sistem. Balkonunuzu tamamen açık hale getirin.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
        ),
    },
    {
        title: "Sürme Cam Balkon",
        description:
            "Panellerin ray üzerinde kaydığı, yerden tasarruf sağlayan ekonomik sistem.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="3" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        title: "Isı Yalıtımı",
        description:
            "4 mevsim kullanım imkanı. Kış aylarında ısı kaybını önler, enerji tasarrufu sağlar.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v10" />
                <path d="M18.4 6.6L12 12" />
                <path d="M22 12h-10" />
                <path d="M18.4 17.4L12 12" />
                <path d="M12 22v-10" />
                <path d="M5.6 17.4L12 12" />
                <path d="M2 12h10" />
                <path d="M5.6 6.6L12 12" />
            </svg>
        ),
    },
    {
        title: "Gürültü İzolasyonu",
        description:
            "Dış ortam gürültüsünü azaltarak daha sessiz bir yaşam alanı sağlar.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
        ),
    },
    {
        title: "Kolay Temizlik",
        description:
            "Özel tasarım sayesinde cam paneller kolayca temizlenebilir.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: "Dayanıklı Malzeme",
        description:
            "Temperli cam ve kaliteli alüminyum profiller ile uzun ömürlü kullanım.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
];

const processSteps = [
    { step: 1, title: "Ücretsiz Keşif", description: "Ekibimiz adresinize gelir ve ölçüm yapar." },
    { step: 2, title: "Teklif", description: "Size özel fiyat teklifi hazırlanır." },
    { step: 3, title: "Üretim", description: "Ölçülerinize göre özel üretim yapılır." },
    { step: 4, title: "Montaj", description: "Profesyonel ekip tarafından montaj gerçekleştirilir." },
];

export default function CamBalkonPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/cam-balkon-hero.jpg')] bg-cover bg-center opacity-20" />
                <div className="container relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3 animate-fade-in">
                            Hizmetlerimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-delay-1" style={{ fontFamily: 'var(--font-heading)' }}>
                            Cam Balkon{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Sistemleri
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-delay-2">
                            Balkonlarınızı 4 mevsim kullanılabilir yaşam alanlarına dönüştürün.
                            Katlanır ve sürme cam balkon sistemleri ile modern ve şık görünüm.
                        </p>
                        <div className="flex flex-wrap gap-4 animate-fade-in-delay-3">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                            >
                                Ücretsiz Keşif
                            </Link>
                            <Link
                                href="/#hesaplayici"
                                className="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-sm border border-white/20 transition-colors"
                            >
                                Fiyat Hesapla
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Neden Cam Balkon?
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Cam balkon sistemlerinin sağladığı avantajlar.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card-hover p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 lg:py-28 bg-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Nasıl Çalışıyoruz?
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Cam balkon montaj sürecimiz 4 basit adımda tamamlanır.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[var(--primary)] text-white text-2xl font-bold rounded-full mb-4">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-[var(--primary)]">
                <div className="container text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Balkonunuzu Dönüştürmeye Hazır mısınız?
                    </h2>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">
                        Ücretsiz keşif randevusu alın, size özel teklifimizi hazırlayalım.
                    </p>
                    <Link
                        href="/iletisim"
                        className="btn-press inline-flex items-center gap-2 bg-white text-[var(--primary)] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
                    >
                        Hemen Randevu Alın
                    </Link>
                </div>
            </section>
        </>
    );
}
