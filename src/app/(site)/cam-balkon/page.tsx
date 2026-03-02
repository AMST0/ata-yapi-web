import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Cam Balkon Sistemleri | Ata Yapı Maltepe - Katlanır & Sürme",
    description:
        "Maltepe'de katlanır cam balkon, sürme cam balkon, ısı camlı ve giyotin cam balkon sistemleri. Ata Yapı ile ölçüye özel üretim, 2 yıl garanti, ücretsiz keşif. Maltepe, Kartal, Pendik bölgelerinde hizmet.",
    keywords: ["cam balkon", "cam balkon maltepe", "katlanır cam balkon", "sürme cam balkon", "cam balkon fiyatları", "cam balkon sistemleri", "ısı camlı cam balkon", "giyotin cam balkon"],
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/cam-balkon',
    },
};

const features = [
    {
        title: "Katlanır Cam Balkon",
        description: "Panellerin kolayca katlanarak toplanabildiği sistem. Balkonunuzu tamamen açık hale getirin.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
        ),
    },
    {
        title: "Sürme Cam Balkon",
        description: "Panellerin ray üzerinde kaydığı, yerden tasarruf sağlayan ekonomik sistem.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="3" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        title: "Isı Yalıtımı",
        description: "4 mevsim kullanım imkanı. Kış aylarında ısı kaybını önler, enerji tasarrufu sağlar.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),
    },
    {
        title: "Gürültü İzolasyonu",
        description: "Dış ortam gürültüsünü azaltarak daha sessiz bir yaşam alanı sağlar.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
        ),
    },
    {
        title: "Kolay Temizlik",
        description: "Özel tasarım sayesinde cam paneller kolayca temizlenebilir.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: "Dayanıklı Malzeme",
        description: "Temperli cam ve kaliteli alüminyum profiller ile uzun ömürlü kullanım.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
];

const processSteps = [
    { step: 1, title: "Ücretsiz Keşif", description: "Ekibimiz adresinize gelir ve ölçüm yapar.", icon: "📍" },
    { step: 2, title: "Teklif", description: "Size özel fiyat teklifi hazırlanır.", icon: "📋" },
    { step: 3, title: "Üretim", description: "Ölçülerinize göre özel üretim yapılır.", icon: "🔧" },
    { step: 4, title: "Montaj", description: "Profesyonel ekip tarafından montaj gerçekleştirilir.", icon: "✅" },
];

const gallery = [
    { src: "/cam-balkon-1.png", alt: "Modern Cam Balkon" },
    { src: "/cam-balkon-2.png", alt: "Katlanır Cam Sistem" },
    { src: "/cam-balkon-service.png", alt: "Lüks Balkon Tasarımı" },
    { src: "/cam-balkon-1.png", alt: "Panoramik Cam Balkon" },
];

export default function CamBalkonPage() {
    return (
        <>
            {/* Service JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Cam Balkon Sistemleri",
                        "description": "Katlanır cam balkon, sürme cam balkon, ısı camlı cam balkon ve giyotin cam balkon sistemleri montajı.",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Ata Yapı Maltepe",
                            "url": "https://www.xn--atayap-u9a.site"
                        },
                        "areaServed": ["Maltepe", "Kartal", "Pendik", "Kadıköy"],
                        "url": "https://www.xn--atayap-u9a.site/cam-balkon"
                    })
                }}
            />
            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/cam-balkon-service.png"
                        alt="Cam Balkon Sistemleri"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Hizmetlerimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Cam Balkon{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Sistemleri
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Balkonlarınızı 4 mevsim kullanılabilir yaşam alanlarına dönüştürün.
                            Katlanır ve sürme cam balkon sistemleri ile modern ve şık görünüm.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                Ücretsiz Keşif
                            </Link>
                            <Link
                                href="/#hesaplayici"
                                className="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-sm border border-white/20 transition-all duration-300"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="4" y="2" width="16" height="20" rx="2" />
                                    <line x1="8" y1="6" x2="16" y2="6" />
                                    <line x1="8" y1="10" x2="16" y2="10" />
                                    <line x1="8" y1="14" x2="12" y2="14" />
                                </svg>
                                Fiyat Hesapla
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {gallery.map((item, index) => (
                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-4 left-4 right-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {item.alt}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            Avantajlar
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Neden <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Cam Balkon?</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Cam balkon sistemlerinin sağladığı avantajlar.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 lg:py-28 bg-gray-900">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-semibold text-white mb-4">
                            Süreç
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Nasıl Çalışıyoruz?
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Cam balkon montaj sürecimiz 4 basit adımda tamamlanır.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((item) => (
                            <div key={item.step} className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {item.step}
                                </div>
                                <div className="text-4xl mb-4 mt-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Balkonunuzu Dönüştürmeye Hazır mısınız?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                        Ücretsiz keşif randevusu alın, size özel teklifimizi hazırlayalım.
                    </p>
                    <Link
                        href="/iletisim"
                        className="btn-press inline-flex items-center gap-3 bg-white text-[var(--primary)] hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Hemen Randevu Alın
                    </Link>
                </div>
            </section>
        </>
    );
}
