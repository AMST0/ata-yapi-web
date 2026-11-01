import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GarageAnimation from "@/components/garage/GarageAnimation";
import GarageConfigurator from "@/components/garage/GarageConfigurator";

export const metadata: Metadata = {
    title: "Teleskopik Garaj Sistemleri | Katlanır Garaj | Ata Yapı",
    description:
        "Teleskopik açılır kapanır garaj sistemleri ile aracınızı dış etkenlerden koruyun. Projeye özel malzeme ve sistem seçenekleri. Paslanmaz çelik, alüminyum, polikarbonat panel seçenekleri. Ücretsiz keşif ve teklif alın.",
    keywords: [
        "teleskopik garaj",
        "katlanır garaj",
        "açılır kapanır garaj",
        "teleskopik garaj sistemi",
        "katlanır garaj sistemi",
        "araç koruma garajı",
        "teleskopik garaj fiyatları",
        "motorlu garaj sistemi",
        "otomatik garaj",
        "garaj sistemleri",
    ],
    alternates: {
        canonical: "https://www.xn--atayap-u9a.site/teleskopik-garaj",
    },
    openGraph: {
        title: "Teleskopik Garaj Sistemleri | Katlanır Garaj | Ata Yapı",
        description:
            "Teleskopik garaj sistemleri ile aracınızı koruyun. Projeye özel çözümler, ücretsiz keşif.",
        url: "https://www.xn--atayap-u9a.site/teleskopik-garaj",
        images: [
            {
                url: "/teleskopik-garaj-hero.jpg",
                width: 1200,
                height: 630,
                alt: "Ata Yapı Teleskopik Garaj Sistemleri",
            },
        ],
    },
};

const usageAreas = [
    {
        title: "Konut & Villa",
        description: "Ev ve villa garajları için kompakt, estetik ve fonksiyonel garaj çözümleri.",
        icon: "🏡",
    },
    {
        title: "Açık Otopark",
        description: "Otopark alanlarında bireysel araç koruma ünitesi olarak kullanılabilir.",
        icon: "🅿️",
    },
    {
        title: "İşletme & Ticari",
        description: "İşyeri araçları ve filo yönetimi için endüstriyel dayanıklılıkta çözümler.",
        icon: "🏢",
    },
    {
        title: "Tekne & Karavan",
        description: "Tekne, karavan ve özel araçlarınız için boyut ve ölçüye uygun koruma sistemleri.",
        icon: "🚤",
    },
];

const advantages = [
    {
        title: "Hava Koşullarından Koruma",
        description: "Yağmur, kar, dolu, güneş ve rüzgar gibi dış etkenlere karşı tam koruma sağlar.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        title: "Kompakt Tasarım",
        description: "Teleskopik mekanizma sayesinde açık konumda minimum yer kaplar.",
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
        title: "Kolay Kullanım",
        description: "Manuel veya motorlu seçenekler. Tek kişiyle kolayca açılıp kapatılabilir.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),
    },
    {
        title: "Düşük Bakım Maliyeti",
        description: "Dayanıklı malzemeler ve basit mekanizma sayesinde minimum bakım gerektirir.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        title: "Estetik Görünüm",
        description: "Modern tasarım çizgileri ile yaşam alanınızın estetiğine katkı sağlar.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),
    },
    {
        title: "Özelleştirilebilir",
        description: "Malzeme, kaplama, boyut ve sistem tipi tamamen ihtiyacınıza göre özelleştirilebilir.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    },
];

const processSteps = [
    {
        step: 1,
        title: "Ücretsiz Keşif",
        description: "Uzman ekibimiz adresinize gelerek alanı inceler, ölçüm yapar ve ihtiyaçlarınızı belirler.",
        icon: "📍",
    },
    {
        step: 2,
        title: "Proje & Teklif",
        description: "Kullanım amacınıza ve alanınıza uygun malzeme, sistem ve tasarım önerisi hazırlanır.",
        icon: "📐",
    },
    {
        step: 3,
        title: "Özel Üretim",
        description: "Projenize özel teleskopik garaj sistemi, seçilen malzeme ve ölçülere göre üretilir.",
        icon: "🔧",
    },
    {
        step: 4,
        title: "Montaj & Teslim",
        description: "Deneyimli ekibimiz tarafından profesyonel montaj gerçekleştirilir ve sistem test edilir.",
        icon: "✅",
    },
];

const materials = [
    {
        name: "Paslanmaz Çelik",
        description: "Yüksek korozyon dayanımı, uzun ömür. Deniz kenarı ve zorlu iklim koşulları için ideal.",
        icon: "🛡️",
    },
    {
        name: "Alüminyum",
        description: "Hafif, modern görünüm, korozyona dayanıklı. Taşınabilir ve kolay montaj.",
        icon: "⚡",
    },
    {
        name: "Polikarbonat Panel",
        description: "Şeffaf veya yarı şeffaf, UV korumalı, darbelere dayanıklı. Işık geçirgenliği yüksek.",
        icon: "💎",
    },
    {
        name: "600D Oxford Kumaş",
        description: "Suya dayanıklı, hafif, ekonomik. Katlanabilir sistemler için ideal kaplama.",
        icon: "🧵",
    },
    {
        name: "PVC Kaplama",
        description: "Renk ve desen seçenekleri, su geçirmez, kolay temizlenebilir yüzey.",
        icon: "🎨",
    },
    {
        name: "Projeye Özel",
        description: "Farklı malzemelerin kombinasyonu ile projenize en uygun çözüm tasarlanır.",
        icon: "🔧",
    },
];

const faqs = [
    {
        question: "Teleskopik garaj nedir?",
        answer: "Teleskopik garaj, iç içe geçen panellerden oluşan bir mekanizma ile açılıp kapanabilen modern bir araç koruma sistemidir. Kapalıyken aracınızı yağmur, güneş, kar, dolu ve toz gibi dış etkenlerden tam olarak korur. Açıkken ise paneller iç içe katlanarak minimum yer kaplar.",
    },
    {
        question: "Katlanır garaj sistemi nasıl çalışır?",
        answer: "Teleskopik garaj sisteminde paneller ray üzerinde hareket eder ve iç içe geçerek açılır. Bu sayede garaj açıkken paneller kompakt bir alan kaplar. Sistem manuel olarak elle veya motorlu/otomatik olarak uzaktan kumanda ile çalıştırılabilir.",
    },
    {
        question: "Hangi malzemelerden üretilir?",
        answer: "Teleskopik garaj sistemlerinde paslanmaz çelik, alüminyum, polikarbonat (PC) panel, 600D Oxford kumaş, PVC kaplama gibi çeşitli malzemeler kullanılabilir. Kullanılacak materyal müşterinin talebi, projenin kullanım amacı ve bölgesel ihtiyaçlara göre değişiklik gösterir.",
    },
    {
        question: "Teleskopik garaj kurulumu ne kadar sürer?",
        answer: "Standart bir teleskopik garaj kurulumu genellikle 1-2 gün içinde tamamlanır. Projenin büyüklüğü, kullanılan malzeme ve zemin koşullarına bağlı olarak süre değişebilir. Keşif sonrasında net süre bilgisi verilir.",
    },
    {
        question: "Motorlu sistem seçeneği var mı?",
        answer: "Evet, teleskopik garaj sistemleri manuel, motorlu ve akıllı sistem olarak üç farklı konfigürasyonda sunulabilir. Motorlu sistem uzaktan kumanda ile çalışır. Akıllı sistem ise yağmur sensörü, zamanlayıcı ve mobil uygulama kontrolü gibi ek özellikler içerebilir.",
    },
    {
        question: "Teleskopik garaj fiyatları ne kadar?",
        answer: "Fiyatlar; kullanılan malzeme, boyut, sistem tipi (manuel/motorlu) ve proje özel gereksinimlerine göre değişiklik gösterir. Kesin fiyat bilgisi için ücretsiz keşif hizmetimizden yararlanarak size özel teklif alabilirsiniz.",
    },
    {
        question: "Bakım gerektirir mi?",
        answer: "Teleskopik garaj sistemleri düşük bakım gerektirir. Periyodik olarak rayların temizlenmesi, mekanizmanın yağlanması ve kaplama yüzeyinin kontrol edilmesi yeterlidir. Motorlu sistemlerde ek olarak motor ve elektrik aksamının yıllık kontrolü önerilir.",
    },
];

export default function TeleskopikGarajPage() {
    // Sayfa geçici olarak pasife alındı; doğrudan anasayfaya yönlendirilir.
    redirect("/");

    return (
        <>
            {/* Service JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Teleskopik Garaj Sistemleri",
                        description:
                            "Teleskopik açılır kapanır garaj sistemleri, katlanır garaj, araç koruma çözümleri. Projeye özel malzeme ve sistem seçenekleri.",
                        provider: {
                            "@type": "LocalBusiness",
                            name: "Ata Yapı",
                            url: "https://www.xn--atayap-u9a.site",
                        },
                        areaServed: ["Balıkesir", "Edremit", "Altınoluk", "İzmir", "Çanakkale", "İstanbul"],
                        url: "https://www.xn--atayap-u9a.site/teleskopik-garaj",
                        image: "https://www.xn--atayap-u9a.site/teleskopik-garaj-hero.jpg",
                    }),
                }}
            />

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: faqs.map((faq) => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.answer,
                            },
                        })),
                    }),
                }}
            />

            {/* BreadcrumbList Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: "Ana Sayfa",
                                item: "https://www.xn--atayap-u9a.site",
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "Teleskopik Garaj Sistemleri",
                                item: "https://www.xn--atayap-u9a.site/teleskopik-garaj",
                            },
                        ],
                    }),
                }}
            />

            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/teleskopik-garaj-hero.jpg"
                        alt="Teleskopik Garaj Sistemleri - Katlanır Garaj"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-2xl">
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-gray-400">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li>
                                    <span className="mx-1">/</span>
                                </li>
                                <li className="text-white font-medium">Teleskopik Garaj</li>
                            </ol>
                        </nav>

                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Yeni Ürün
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Teleskopik Garaj{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Sistemleri
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Açılır kapanır teleskopik garaj sistemi ile aracınızı yağmur, güneş, kar ve
                            dış etkenlerden koruyun. Projeye özel malzeme seçenekleri ve estetik tasarım.
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
                            <a
                                href="https://wa.me/905314002959?text=Merhaba%2C%20teleskopik%20garaj%20sistemi%20hakkında%20bilgi%20almak%20istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/25"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp İle Yazın
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Animation */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/10 rounded-full text-sm font-semibold text-[var(--secondary)] mb-4">
                            İnteraktif Demo
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Nasıl{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)]">
                                Çalışır?
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Teleskopik garaj sisteminin açılıp kapanma mekanizmasını keşfedin.
                        </p>
                    </div>
                    <GarageAnimation />
                </div>
            </section>

            {/* Usage Areas */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/10 rounded-full text-sm font-semibold text-[var(--accent-dark)] mb-4">
                            Kullanım Alanları
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Nerelerde{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Kullanılır?
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Teleskopik garaj sistemleri birçok farklı alanda uygulanabilir.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {usageAreas.map((area, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-[var(--secondary)]/20 transition-all duration-300 hover:-translate-y-1 text-center"
                            >
                                <div className="text-4xl mb-4">{area.icon}</div>
                                <h3
                                    className="text-xl font-bold text-gray-900 mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {area.title}
                                </h3>
                                <p className="text-gray-600">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Configurator */}
            <section className="py-20 lg:py-28 bg-white" id="konfigurator">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            Ürün Konfigüratörü
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Size Uygun{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Sistemi Keşfedin
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            İhtiyacınıza uygun malzeme, kaplama, sistem tipi ve kullanım alanını seçerek
                            projenize özel teleskopik garaj çözümünü keşfedin.
                        </p>
                    </div>
                    <GarageConfigurator />
                </div>
            </section>

            {/* Materials */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/10 rounded-full text-sm font-semibold text-[var(--secondary)] mb-4">
                            Malzeme Seçenekleri
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Projeye Özel{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)]">
                                Malzemeler
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Her proje farklıdır. Kullanılacak materyal müşterinin talebi, kullanım amacı ve
                            bölgesel ihtiyaçlara göre değişir.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {materials.map((material, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-[var(--secondary)]/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-3xl mb-3">{material.icon}</div>
                                <h3
                                    className="text-lg font-bold text-gray-900 mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {material.name}
                                </h3>
                                <p className="text-gray-600 text-sm">{material.description}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-gray-500 italic">
                        * Malzeme ve sistem özellikleri projeye ve müşteri talebine göre değişiklik gösterebilir. Yukarıdaki seçenekler
                        standart bir listeyi temsil etmekte olup projeye özel farklı kombinasyonlar da mümkündür.
                    </p>
                </div>
            </section>

            {/* Advantages */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            Avantajlar
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Neden{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Teleskopik Garaj?
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((advantage, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {advantage.icon}
                                </div>
                                <h3
                                    className="text-xl font-bold text-gray-900 mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {advantage.title}
                                </h3>
                                <p className="text-gray-600">{advantage.description}</p>
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
                            Kurulum Süreci
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Nasıl Çalışıyoruz?
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Teleskopik garaj kurulum sürecimiz 4 adımda tamamlanır.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((item) => (
                            <div
                                key={item.step}
                                className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {item.step}
                                </div>
                                <div className="text-4xl mb-4 mt-4">{item.icon}</div>
                                <h3
                                    className="text-xl font-bold text-white mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            Sıkça Sorulan Sorular
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Teleskopik Garaj{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Hakkında
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-gray-900 hover:text-[var(--primary)] transition-colors">
                                    <span>{faq.question}</span>
                                    <svg
                                        className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]">
                <div className="container text-center">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Projenize Uygun Teleskopik Garaj Çözümünü Birlikte Oluşturalım
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                        Ücretsiz keşif randevusu alın, aracınız için en uygun garaj sistemini birlikte belirleyelim.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/iletisim"
                            className="btn-press inline-flex items-center gap-3 bg-white text-[var(--primary)] hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            Hemen Randevu Alın
                        </Link>
                        <a
                            href="https://wa.me/905314002959?text=Merhaba%2C%20teleskopik%20garaj%20sistemi%20için%20fiyat%20bilgisi%20almak%20istiyorum."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-press inline-flex items-center gap-3 bg-[#25D366] text-white hover:bg-[#20BD5A] px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp İle Bilgi Alın
                        </a>
                    </div>
                </div>
            </section>

            {/* Internal Links */}
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/giyotin-cam" className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                            Giyotin Cam Sistemleri
                        </Link>
                        <span className="text-gray-300">·</span>
                        <Link href="/cam-balkon" className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                            Cam Balkon
                        </Link>
                        <span className="text-gray-300">·</span>
                        <Link href="/bayi-kurumsal" className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                            Bayi & Kurumsal Satış
                        </Link>
                        <span className="text-gray-300">·</span>
                        <Link href="/bolge/balikesir-giyotin-cam" className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                            Balıkesir Hizmetleri
                        </Link>
                        <span className="text-gray-300">·</span>
                        <Link href="/fiyatlandirma" className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                            Fiyatlandırma
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
