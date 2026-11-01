import Link from "next/link";
import Image from "next/image";

const services = [
    {
        id: "giyotin-cam",
        title: "Giyotin Cam Sistemleri",
        description:
            "Dikey sürgülü giyotin cam paneller ile mekanlarınızı modernleştirin. Motorlu ve manuel seçenekler, %100 açıklık, ticari ve konut uygulamaları.",
        image: "/giyotin-cam-service.png",
        features: ["Motorlu Sistem", "Tam Açıklık", "Ticari & Konut"],
        color: "var(--primary)",
        href: "/giyotin-cam",
        featured: true,
    },
    {
        id: "teleskopik-garaj",
        title: "Teleskopik Garaj",
        description:
            "Teleskopik açılır kapanır garaj sistemleri ile aracınızı dış etkenlerden koruyun. Projeye özel malzeme ve sistem seçenekleri.",
        image: "/giyotin-cam-hero.png",
        features: ["Açılır Kapanır", "Araç Koruma", "Özel Tasarım"],
        color: "var(--secondary)",
        href: "/teleskopik-garaj",
        featured: true,
    },
    {
        id: "cam-balkon",
        title: "Cam Balkon",
        description:
            "Katlanır ve sürme cam balkon sistemleri ile balkonlarınızı 4 mevsim kullanılabilir alanlara dönüştürün.",
        image: "/cam-balkon-service.png",
        features: ["Katlanır Sistem", "Sürme Sistem", "Isı Yalıtımı"],
        color: "var(--accent)",
        href: "/cam-balkon",
    },
    {
        id: "sineklik",
        title: "Sineklik",
        description:
            "Plise, menteşeli ve sürme sineklik sistemleri. Haşerelerden korunarak temiz hava alın.",
        image: "/sineklik-service.png",
        features: ["Plise Sineklik", "Menteşeli", "Sürme Sistem"],
        color: "var(--brand-blue)",
        href: "/sineklik",
    },
    {
        id: "tente",
        title: "Tente",
        description:
            "Mafsallı, kasetli ve pergola tente sistemleri ile güneşten korunun, dış mekanlarınızı kullanın.",
        image: "/tente-service.png",
        features: ["Mafsallı Tente", "Kasetli Tente", "Pergola"],
        color: "#9333ea",
        href: "/tente",
    },
    {
        id: "pimapen-tamir",
        title: "Pimapen",
        description:
            "PVC pencere ve kapı sistemleriniz için profesyonel montaj, tamir ve bakım hizmetleri.",
        image: "/pimapen.png",
        features: ["Kaliteli Montaj", "Bakım Onarım", "Yalıtım Çözümleri"],
        color: "#059669",
        href: "/pimapen-tamir",
    },
];

const serviceIcons: Record<string, React.ReactNode> = {
    "giyotin-cam": (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="12 16 12 8" />
            <polyline points="9 11 12 8 15 11" />
            <polyline points="9 13 12 16 15 13" />
        </svg>
    ),
    "teleskopik-garaj": (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21V8l9-5 9 5v13" />
            <rect x="6" y="13" width="12" height="8" rx="1" />
            <line x1="6" y1="15" x2="18" y2="15" />
            <line x1="6" y1="17" x2="18" y2="17" />
            <line x1="6" y1="19" x2="18" y2="19" />
        </svg>
    ),
    "cam-balkon": (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
    ),
    "sineklik": (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    "tente": (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3h18v7c0 0-4 3-9 3s-9-3-9-3V3z" />
            <line x1="3" y1="10" x2="3" y2="21" />
            <line x1="21" y1="10" x2="21" y2="21" />
        </svg>
    ),
    "pimapen-tamir": (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 13h18M3 7h18M3 19h18" />
            <path d="M14 3v18M10 3v18" />
        </svg>
    ),
};

export default function Services() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Ürün & Hizmetlerimiz
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Çözümler</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Giyotin cam sistemleri, teleskopik garaj ve cam balkon çözümleriyle yaşam alanlarınızı dönüştürüyoruz.
                    </p>
                </div>

                {/* Featured Products - 2 column wide */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {services.filter(s => s.featured).map((service) => (
                        <Link
                            key={service.id}
                            href={service.href}
                            className="group block overflow-hidden rounded-3xl bg-white shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500 border border-gray-100"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                                
                                {/* Featured badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--primary)] text-white text-xs font-bold rounded-full badge-shimmer">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                        Öne Çıkan
                                    </span>
                                </div>

                                {/* Features badges */}
                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                    {service.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: `${service.color}15`, color: service.color }}
                                    >
                                        {serviceIcons[service.id]}
                                    </div>
                                    <h3
                                        className="text-xl font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                                    <span>Detaylı Bilgi</span>
                                    <svg
                                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Other Services - 4 column grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.filter(s => !s.featured).map((service) => (
                        <Link
                            key={service.id}
                            href={service.href}
                            className="group block overflow-hidden rounded-3xl bg-white shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500 border border-gray-100"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

                                {/* Features badges */}
                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                    {service.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className="w-10 h-10 flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: `${service.color}15`, color: service.color }}
                                    >
                                        {serviceIcons[service.id]}
                                    </div>
                                    <h3
                                        className="text-lg font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="flex items-center gap-2 text-[var(--primary)] font-semibold text-sm">
                                    <span>Detaylı Bilgi</span>
                                    <svg
                                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
