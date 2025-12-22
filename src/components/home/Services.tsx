import Link from "next/link";
import Image from "next/image";

const services = [
    {
        id: "cam-balkon",
        title: "Cam Balkon",
        description:
            "Katlanır ve sürme cam balkon sistemleri ile balkonlarınızı 4 mevsim kullanılabilir alanlara dönüştürün.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        features: ["Katlanır Sistem", "Sürme Sistem", "Isı Yalıtımı"],
        color: "var(--primary)",
        href: "/cam-balkon",
    },
    {
        id: "sineklik",
        title: "Sineklik",
        description:
            "Plise, menteşeli ve sürme sineklik sistemleri. Haşerelerden korunarak temiz hava alın.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        features: ["Plise Sineklik", "Menteşeli", "Sürme Sistem"],
        color: "var(--secondary)",
        href: "/sineklik",
    },
    {
        id: "tente",
        title: "Tente",
        description:
            "Mafsallı, kasetli ve pergola tente sistemleri ile güneşten korunun, dış mekanlarınızı kullanın.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        features: ["Mafsallı Tente", "Kasetli Tente", "Pergola"],
        color: "var(--accent)",
        href: "/tente",
    },
];

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
                        Hizmetlerimiz
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Çözümler</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Yaşam alanlarınızı ölçüye özel üretim ve kaliteli malzemelerle dönüştürüyoruz.
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link
                            key={service.id}
                            href={service.href}
                            className={`group block overflow-hidden rounded-3xl bg-white shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500 border border-gray-100 animate-fade-in-delay-${index + 1}`}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
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
                            <div className="p-6">
                                {/* Title with icon */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: `${service.color}15`, color: service.color }}
                                    >
                                        {service.id === "cam-balkon" && (
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <line x1="3" y1="9" x2="21" y2="9" />
                                                <line x1="9" y1="21" x2="9" y2="9" />
                                            </svg>
                                        )}
                                        {service.id === "sineklik" && (
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <rect x="3" y="3" width="7" height="7" />
                                                <rect x="14" y="3" width="7" height="7" />
                                                <rect x="14" y="14" width="7" height="7" />
                                                <rect x="3" y="14" width="7" height="7" />
                                            </svg>
                                        )}
                                        {service.id === "tente" && (
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M3 3h18v7c0 0-4 3-9 3s-9-3-9-3V3z" />
                                                <line x1="3" y1="10" x2="3" y2="21" />
                                                <line x1="21" y1="10" x2="21" y2="21" />
                                            </svg>
                                        )}
                                    </div>
                                    <h3
                                        className="text-xl font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Link Arrow */}
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
            </div>
        </section>
    );
}
