import Link from "next/link";

const services = [
    {
        id: "cam-balkon",
        title: "Cam Balkon",
        description:
            "Katlanır ve sürme cam balkon sistemleri ile balkonlarınızı 4 mevsim kullanılabilir alanlara dönüştürün.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
        color: "var(--primary)",
        href: "/cam-balkon",
    },
    {
        id: "sineklik",
        title: "Sineklik",
        description:
            "Plise, menteşeli ve sürme sineklik sistemleri. Haşerelerden korunarak temiz hava alın.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        color: "var(--secondary)",
        href: "/sineklik",
    },
    {
        id: "tente",
        title: "Tente",
        description:
            "Mafsallı, kasetli ve pergola tente sistemleri ile güneşten korunun, dış mekanlarınızı kullanılabilir hale getirin.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 3h18v7c0 0-4 3-9 3s-9-3-9-3V3z" />
                <line x1="3" y1="10" x2="3" y2="21" />
                <line x1="21" y1="10" x2="21" y2="21" />
            </svg>
        ),
        color: "var(--accent)",
        href: "/tente",
    },
];

export default function Services() {
    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="inline-block text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
                        Hizmetlerimiz
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Profesyonel Çözümler
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Yaşam alanlarınızı ölçüye özel üretim ve kaliteli malzemelerle dönüştürüyoruz.
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <Link
                            key={service.id}
                            href={service.href}
                            className={`group card-hover block p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 animate-fade-in-delay-${index + 1}`}
                        >
                            {/* Icon */}
                            <div
                                className="w-16 h-16 flex items-center justify-center rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${service.color}15`, color: service.color }}
                            >
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3
                                className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary)] transition-colors"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Link Arrow */}
                            <div className="flex items-center gap-2 text-[var(--primary)] font-medium">
                                <span>Detaylı Bilgi</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
