import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Tente Sistemleri | Ata Yapı Maltepe - Mafsallı & Kasetli & Motorlu",
    description:
        "Maltepe'de mafsallı tente, kasetli tente, motorlu tente ve pergola tente sistemleri. UV korumalı kumaşlar, 5 yıl garanti, ücretsiz keşif. Maltepe, Kartal, Pendik bölgelerinde hizmet.",
    keywords: ["tente", "tente maltepe", "mafsallı tente", "kasetli tente", "motorlu tente", "tente fiyatları", "pergola tente"],
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/tente',
    },
};

const tenteTypes = [
    {
        title: "Mafsallı Tente",
        description:
            "Klasik kol sistemi ile açılıp kapanan tente. Balkon ve teraslar için ideal.",
        features: ["Manuel veya motorlu", "3-6 metre genişlik", "Dayanıklı kumaş", "Kolay kullanım"],
        image: "/mafsalli-tente.png",
        href: "/tente/mafsalli",
    },
    {
        title: "Kasetli Tente",
        description:
            "Kumaşın kaset içinde korunduğu premium sistem. Uzun ömürlü kullanım.",
        features: ["Kumaş koruması", "Modern görünüm", "Motorlu sistem", "Uzaktan kumanda"],
        image: "/kasetli-tente.png",
        href: "/tente/kasetli",
    },
    {
        title: "Pergola Tente",
        description:
            "Sabit yapı üzerine monte edilen geniş alan tente sistemi.",
        features: ["Geniş alan", "Sağlam yapı", "Yağmur/güneş koruması", "Özel tasarım"],
        image: "/tente-service.png",
        href: "/tente/pergola",
    },
];

const benefits = [
    {
        title: "Güneş Koruması",
        description: "Zararlı UV ışınlarından ve aşırı sıcaktan korunun.",
        icon: "☀️",
    },
    {
        title: "Enerji Tasarrufu",
        description: "Klima ihtiyacını azaltarak enerji maliyetlerini düşürün.",
        icon: "💡",
    },
    {
        title: "Yaşam Alanı",
        description: "Dış mekanlarınızı kullanılabilir alanlara dönüştürün.",
        icon: "🏠",
    },
    {
        title: "Estetik Görünüm",
        description: "Binaya değer katan şık ve modern tasarımlar.",
        icon: "✨",
    },
];

export default function TentePage() {
    return (
        <>
            {/* Service JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Tente Sistemleri",
                        "description": "Mafsallı tente, kasetli tente, motorlu tente ve pergola tente sistemleri montajı.",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Ata Yapı Maltepe",
                            "url": "https://www.xn--atayap-u9a.site"
                        },
                        "areaServed": ["Maltepe", "Kartal", "Pendik", "Kadıköy"],
                        "url": "https://www.xn--atayap-u9a.site/tente"
                    })
                }}
            />
            {/* Hero */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/tente-service.png"
                        alt="Tente Sistemleri"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3 animate-fade-in">
                            Hizmetlerimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-delay-1" style={{ fontFamily: 'var(--font-heading)' }}>
                            Tente{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]">
                                Sistemleri
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-delay-2">
                            Mafsallı, kasetli ve pergola tente sistemleri ile güneşten korunun.
                            Balkon, teras ve bahçelerinizi konforlu hale getirin.
                        </p>
                        <Link
                            href="/iletisim"
                            className="btn-press inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-colors animate-fade-in-delay-3"
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
                            Tente Çeşitlerimiz
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Her alan için uygun tente çözümleri sunuyoruz.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {tenteTypes.map((type, index) => (
                            <Link
                                key={index}
                                href={type.href}
                                className="group block overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={type.image}
                                        alt={type.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {type.title}
                                    </h3>
                                </div>
                                {/* Content */}
                                <div className="p-6">
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
                                    <div className="mt-4 flex items-center gap-2 text-[var(--accent)] font-semibold">
                                        <span>Detaylı Bilgi</span>
                                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

            {/* Benefits */}
            <section className="py-20 lg:py-28 bg-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Tente Sistemlerinin Faydaları
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm">
                                <div className="text-4xl mb-4">{benefit.icon}</div>
                                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-[var(--accent)]">
                <div className="container text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Dış Mekanlarınızı Dönüştürün
                    </h2>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">
                        Size en uygun tente sistemini belirlemek için ücretsiz keşif randevusu alın.
                    </p>
                    <Link
                        href="/iletisim"
                        className="btn-press inline-flex items-center gap-2 bg-white text-[var(--accent)] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
                    >
                        Hemen Randevu Alın
                    </Link>
                </div>
            </section>
        </>
    );
}
