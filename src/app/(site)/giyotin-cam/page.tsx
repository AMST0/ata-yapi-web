import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Giyotin Cam Sistemleri | Motorlu & Manuel Dikey Sürgülü Cam | Ata Yapı",
    description:
        "Ata Yapı giyotin cam sistemleri — motorlu ve manuel dikey sürgülü cam balkon, teras, kafe ve kış bahçesi çözümleri. Balıkesir, Edremit, Altınoluk, Akçay, İzmir, Çanakkale ve İstanbul genelinde ölçüye özel imalat, 2 yıl garanti, ücretsiz keşif.",
    keywords: [
        "giyotin cam",
        "giyotin cam balkon",
        "giyotin cam sistemi",
        "motorlu giyotin sistem",
        "giyotin cam fiyatları",
        "dikey sürgülü cam",
        "dikey sürgülü cam balkon",
        "giyotin cam teras",
        "giyotin cam kış bahçesi",
        "giyotin cam pergola",
        "giyotin cam balıkesir",
        "giyotin cam edremit",
        "giyotin cam altınoluk",
        "giyotin cam izmir",
        "giyotin cam çanakkale",
    ],
    alternates: {
        canonical: "https://www.xn--atayap-u9a.site/giyotin-cam",
    },
    openGraph: {
        title: "Giyotin Cam Sistemleri | Ata Yapı",
        description:
            "Giyotin cam sistemleri ile mekanlarınızı modern, şık ve fonksiyonel alanlara dönüştürün. Motorlu ve manuel dikey sürgülü cam paneller ile %100 açıklık.",
        url: "https://www.xn--atayap-u9a.site/giyotin-cam",
        images: [
            {
                url: "/giyotin-cam-hero.png",
                width: 1200,
                height: 630,
                alt: "Ata Yapı Giyotin Cam Sistemleri",
            },
        ],
    },
};

const subCategories = [
    {
        title: "Motorlu Giyotin Sistem",
        description: "Uzaktan kumandalı, sessiz motorlu ve yağmur/rüzgar sensörlü akıllı cam çözümleri.",
        href: "/giyotin-cam/motorlu",
        badge: "Otomasyon",
        icon: "⚡",
    },
    {
        title: "Uygulama Alanları",
        description: "Kafe, restoran, villa, çatı terası, kış bahçesi ve pergola giyotin uygulamaları.",
        href: "/giyotin-cam/uygulamalar",
        badge: "Ticari & Konut",
        icon: "🏢",
    },
    {
        title: "İmalat & Montaj",
        description: "Kendi atölyemizde CNC kesim, elektrostatik boya ve garantili montaj süreci.",
        href: "/giyotin-cam/imalat",
        badge: "Doğrudan Üretici",
        icon: "🔧",
    },
];

const features = [
    {
        title: "Dikey Sürgülü Mekanizma",
        description:
            "Cam paneller dikey olarak yukarı-aşağı kayar, yatay sürgü sistemlerine göre çok daha az yer kaplar.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="17 11 12 6 7 11" />
                <polyline points="17 18 12 13 7 18" />
            </svg>
        ),
    },
    {
        title: "Maksimum Açıklık (%100)",
        description:
            "Cam paneller tamamen yukarı kaldırılarak %100 açık alan elde edilir. Mekanınız kesintisiz hava alır.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
    },
    {
        title: "Rüzgar & Yağmur İzolasyonu",
        description:
            "Kapalı konumda mükemmel rüzgar ve yağmur izolasyonu sağlar, kış aylarında bile konforlu kullanım sunar.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        title: "Temperli & Isıcam Güvenliği",
        description:
            "8mm/10mm temperli cam veya çift camlı Isıcam kullanımı ile yüksek mukavemet ve termal tasarruf.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
            </svg>
        ),
    },
    {
        title: "Kolay & Güvenli Temizlik",
        description:
            "Silinebilir alt paneller ve içe açılan emniyet mekanizması ile yüksek katlarda bile zahmetsiz temizlik.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: "Estetik Korkuluk İşlevi",
        description:
            "Alt panel sabit kalarak şık bir cam korkuluk işlevi görür, özellikle çocuklu aileler ve mekanlar için güvenlidir.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),
    },
];

const processSteps = [
    {
        step: 1,
        title: "Ücretsiz Keşif & Lazer Ölçüm",
        description: "Teknik ekibimiz mekanınıza gelerek lazer ölçüm alır, statik yük ve rüzgar şartlarını inceler.",
        icon: "📍",
    },
    {
        step: 2,
        title: "3D Tasarım & Fiyatlandırma",
        description: "Manuel/motorlu sistem, cam kalınlığı ve renk seçimine göre detaylı teklif sunulur.",
        icon: "📐",
    },
    {
        step: 3,
        title: "Atölyede Özel İmalat",
        description: "Milimetrik toleransla CNC profil kesimi, fırın boya ve fabrika kalite testleri yapılır.",
        icon: "🔧",
    },
    {
        step: 4,
        title: "Garantili Profesyonel Montaj",
        description: "Sertifikalı ekibimiz montajı tamamlar, testleri yapar ve 2 yıl tam garanti belgesi teslim eder.",
        icon: "✅",
    },
];

const gallery = [
    { src: "/giyotin-cam-hero.png", alt: "Giyotin Cam Balkon Sistemi" },
    { src: "/giyotin-cam-service.png", alt: "Modern Giyotin Cam Uygulaması" },
    { src: "/giyotin-cam-detail.png", alt: "Giyotin Cam Detay Görünümü" },
    { src: "/giyotin-cam-terrace.png", alt: "Giyotin Cam Teras Çözümü" },
];

const usageAreas = [
    {
        title: "Balkon & Teras",
        description: "Balkon ve teraslarınızı 4 mevsim kesintisiz manzarayla kullanın.",
        icon: "🏢",
    },
    {
        title: "Kafe & Restoran",
        description: "Müşterilerinize hem açık hava ferahlığı hem de kışın sıcak bir ortam sunun.",
        icon: "☕",
    },
    {
        title: "Villa & Müstakil Evler",
        description: "Bahçe katı, veranda ve havuz başı alanlarını genişletin.",
        icon: "🏡",
    },
    {
        title: "Kış Bahçesi & Pergola",
        description: "Biyoklimatik pergola altına tam uyumlu kapatma.",
        icon: "🌿",
    },
];

const faqs = [
    {
        question: "Giyotin cam sistemi nedir?",
        answer: "Giyotin cam sistemi, cam panellerin dikey olarak yukarı-aşağı kayarak açılıp kapandığı modern bir cam balkon sistemidir. Manuel veya uzaktan kumandalı motorlu olarak çalışabilir. Paneller yukarı toplandığında alt kısım korkuluk görevi görür, tamamen açıldığında ise mekan açık terasa dönüşür.",
    },
    {
        question: "Giyotin cam sisteminin avantajları nelerdir?",
        answer: "Maksimum açıklık sağlaması, yanlara doğru katlanma alanı kaplamaması, motorlu ve akıllı kontrol imkanı, yüksek rüzgar dayanımı, Isıcam ile kışın mükemmel yalıtım ve estetik görünüm başlıca avantajlarıdır.",
    },
    {
        question: "Giyotin cam fiyatları ne kadardır?",
        answer: "Fiyatlar; mekanın genişlik ve yükseklik ölçülerine, tercih edilen cam türüne (8mm temperli / Isıcam), motor tipine (Somfy, Becker vb.) ve profil rengine göre belirlenir. Ücretsiz yerinde keşif yaparak size en net ve avantajlı teklifi sunuyoruz.",
    },
    {
        question: "Hangi bölgelerde giyotin cam montajı yapıyorsunuz?",
        answer: "Balıkesir (Edremit, Altınoluk, Akçay, Güre, Zeytinli), İzmir, Çanakkale ve İstanbul genelinde profesyonel keşif ve montaj hizmeti sunmaktayız.",
    },
    {
        question: "Giyotin cam montajı ne kadar sürer?",
        answer: "İmalat tamamlandıktan sonra standart bir balkon veya teras giyotin cam montajı genellikle 1 gün içerisinde temiz bir şekilde tamamlanır.",
    },
    {
        question: "Sistem garantisi ne kadar?",
        answer: "Tüm giyotin cam sistemlerimiz, profillerimiz, motor mekanizmamız ve montaj işçiliğimiz 2 yıl tam garanti kapsamındadır.",
    },
];

export default function GiyotinCamPage() {
    return (
        <>
            {/* Service JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Giyotin Cam Sistemleri",
                        description:
                            "Giyotin cam balkon, motorlu giyotin cam, giyotin cam teras, kafe ve kış bahçesi çözümleri. Balıkesir, Edremit, Altınoluk, İzmir, Çanakkale, İstanbul.",
                        provider: {
                            "@type": "LocalBusiness",
                            name: "Ata Yapı",
                            url: "https://www.xn--atayap-u9a.site",
                        },
                        areaServed: ["Balıkesir", "Edremit", "Altınoluk", "Akçay", "İzmir", "Çanakkale", "İstanbul"],
                        url: "https://www.xn--atayap-u9a.site/giyotin-cam",
                        image: "https://www.xn--atayap-u9a.site/giyotin-cam-hero.png",
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
                                name: "Giyotin Cam Sistemleri",
                                item: "https://www.xn--atayap-u9a.site/giyotin-cam",
                            },
                        ],
                    }),
                }}
            />

            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/giyotin-cam-hero.png"
                        alt="Giyotin Cam Sistemleri - Motorlu Dikey Sürgülü Cam"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-3xl">
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
                                <li className="text-white font-medium">Giyotin Cam Sistemleri</li>
                            </ol>
                        </nav>

                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Ana Ürün & İmalat
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Giyotin Cam{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Sistemleri
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Dikey hareket eden motorlu veya manuel cam paneller ile balkon, teras, kafe ve verandalarınızı
                            kesintisiz manzarayla buluşturun. Ölçüye özel üretim ve profesyonel montaj.
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
                                href="https://wa.me/905314002959?text=Merhaba%2C%20giyotin%20cam%20sistemi%20hakkında%20bilgi%20almak%20istiyorum."
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

            {/* Sub Categories / Deep Dive Links */}
            <section className="py-12 bg-gray-50 border-b border-gray-100">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-6">
                        {subCategories.map((cat, idx) => (
                            <Link
                                key={idx}
                                href={cat.href}
                                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[var(--primary)]/30 transition-all flex items-start gap-4 group"
                            >
                                <div className="text-3xl p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">{cat.badge}</span>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors">{cat.title}</h3>
                                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">{cat.description}</p>
                                </div>
                            </Link>
                        ))}
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

            {/* Usage Areas */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/10 rounded-full text-sm font-semibold text-[var(--secondary)] mb-4">
                            Kullanım Alanları
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Giyotin Cam{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)]">
                                Nerelerde Kullanılır?
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Ticari ve konut tipi projelere uygun, dikey sürgülü giyotin cam uygulamaları.
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

            {/* Features */}
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
                                Giyotin Cam?
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Giyotin cam sistemlerinin sağladığı eşsiz avantajlar.
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
                                <h3
                                    className="text-xl font-bold text-gray-900 mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/10 rounded-full text-sm font-semibold text-[var(--accent-dark)] mb-4">
                            Karşılaştırma
                        </span>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Giyotin Cam vs{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Diğer Sistemler
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 text-left font-bold text-gray-900 bg-gray-50 rounded-tl-xl">
                                        Özellik
                                    </th>
                                    <th className="p-4 text-center font-bold text-white bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]">
                                        Giyotin Cam
                                    </th>
                                    <th className="p-4 text-center font-bold text-gray-900 bg-gray-50">
                                        Katlanır Cam
                                    </th>
                                    <th className="p-4 text-center font-bold text-gray-900 bg-gray-50 rounded-tr-xl">
                                        Sürme Cam
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Açıklık Oranı", "✅ %100", "✅ %90", "⚠️ %50-70"],
                                    ["Yer Tasarrufu", "✅ Çok İyi", "⚠️ Orta", "✅ İyi"],
                                    ["Rüzgar İzolasyonu", "✅ Mükemmel", "⚠️ İyi", "⚠️ Orta"],
                                    ["Modern Görünüm", "✅ Çok İyi", "✅ İyi", "⚠️ Standart"],
                                    ["Motor & Sensör", "✅ Tam Uyumlu", "❌ Yok", "⚠️ Kısıtlı"],
                                    ["Korkuluk Güvenliği", "✅ Entegre Korkuluk", "❌ Ekstra Gerekir", "❌ Ekstra Gerekir"],
                                    ["Temizlik Kolaylığı", "✅ Çok Kolay", "⚠️ Orta", "❌ Zor"],
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                                        <td className="p-4 font-medium text-gray-900 border-t border-gray-100">
                                            {row[0]}
                                        </td>
                                        <td className="p-4 text-center border-t border-gray-100 bg-[var(--primary)]/5 font-medium">
                                            {row[1]}
                                        </td>
                                        <td className="p-4 text-center border-t border-gray-100">{row[2]}</td>
                                        <td className="p-4 text-center border-t border-gray-100">{row[3]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Nasıl Çalışıyoruz?
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Giyotin cam montaj sürecimiz 4 basit adımda tamamlanır.
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
                            Giyotin Cam{" "}
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

            {/* Regional Links */}
            <section className="py-12 bg-gray-100">
                <div className="container text-center">
                    <h3 className="text-gray-700 font-semibold mb-4">Giyotin Cam Hizmet Bölgelerimiz</h3>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                        <Link href="/bolge/balikesir-giyotin-cam" className="bg-white px-4 py-2 rounded-lg text-gray-700 hover:text-[var(--primary)] border border-gray-200 transition-colors">
                            Balıkesir Giyotin Cam
                        </Link>
                        <Link href="/bolge/edremit-giyotin-cam" className="bg-white px-4 py-2 rounded-lg text-gray-700 hover:text-[var(--primary)] border border-gray-200 transition-colors">
                            Edremit Giyotin Cam
                        </Link>
                        <Link href="/bolge/altinoluk-giyotin-cam" className="bg-white px-4 py-2 rounded-lg text-gray-700 hover:text-[var(--primary)] border border-gray-200 transition-colors">
                            Altınoluk Giyotin Cam
                        </Link>
                        <Link href="/bolge/izmir-giyotin-cam" className="bg-white px-4 py-2 rounded-lg text-gray-700 hover:text-[var(--primary)] border border-gray-200 transition-colors">
                            İzmir Giyotin Cam
                        </Link>
                        <Link href="/bolge/canakkale-giyotin-cam" className="bg-white px-4 py-2 rounded-lg text-gray-700 hover:text-[var(--primary)] border border-gray-200 transition-colors">
                            Çanakkale Giyotin Cam
                        </Link>
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
                        Giyotin Cam Sistemi ile Mekanınızı Dönüştürün
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                        Ücretsiz keşif randevusu alın, giyotin cam sistemi için size özel teklifimizi hazırlayalım.
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
                            href="https://wa.me/905314002959?text=Merhaba%2C%20giyotin%20cam%20sistemi%20için%20fiyat%20bilgisi%20almak%20istiyorum."
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
        </>
    );
}
