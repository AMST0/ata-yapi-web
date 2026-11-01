import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABlock from "@/components/seo/CTABlock";

export const metadata: Metadata = {
    title: "Motorlu Giyotin Cam Sistemleri | Otomatik Açılır Kapanır | Ata Yapı",
    description:
        "Motorlu ve uzaktan kumandalı giyotin cam sistemleri. Somfy ve Becker motor seçenekleri, rüzgar ve yağmur sensörü entegrasyonu, sessiz çalışma, 2 yıl garanti. Balıkesir, İzmir, Çanakkale ve İstanbul'da ücretsiz keşif.",
    keywords: [
        "motorlu giyotin cam",
        "otomatik giyotin cam",
        "uzaktan kumandalı giyotin cam",
        "elektrikli giyotin cam sistemi",
        "motorlu cam balkon",
        "somfy motorlu giyotin",
        "otomatik dikey sürgülü cam",
        "motorlu giyotin fiyatları",
    ],
    alternates: {
        canonical: "https://www.xn--atayap-u9a.site/giyotin-cam/motorlu",
    },
    openGraph: {
        title: "Motorlu Giyotin Cam Sistemleri | Ata Yapı",
        description: "Tek tuşla açılıp kapanan motorlu giyotin cam sistemleri. Uzaktan kumandalı, sensörlü ve akıllı ev uyumlu çözümler.",
        url: "https://www.xn--atayap-u9a.site/giyotin-cam/motorlu",
        images: [
            {
                url: "/giyotin-cam-hero.jpg",
                width: 1200,
                height: 630,
                alt: "Motorlu Giyotin Cam Sistemleri",
            },
        ],
    },
};

const motorFeatures = [
    {
        title: "Uzaktan Kumanda & Mobil Kontrol",
        description: "Tek tuşla veya akıllı telefon uygulamasıyla tüm panelleri aynı anda veya bağımsız olarak kontrol edin.",
        icon: "📱",
    },
    {
        title: "Akıllı Hava Sensörleri",
        description: "Yağmur ve rüzgar sensörleri sayesinde olumsuz hava koşullarında sistem otomatik olarak kapanır.",
        icon: "🌧️",
    },
    {
        title: "Sessiz ve Güçlü Motorlar",
        description: "Dünya standartlarında Somfy ve Becker tüp motorlar ile ultra sessiz ve uzun ömürlü mekanizma.",
        icon: "⚡",
    },
    {
        title: "Güvenlik & Sıkışma Emniyeti",
        description: "Kapanma esnasında bir engelle karşılaştığında otomatik durma ve geri çekilme sensörü.",
        icon: "🛡️",
    },
    {
        title: "Isı ve Ses Yalıtımı",
        description: "Isıcamlı (çift cam) paneller ve özel fitil sistemi ile maksimum termal ve akustik yalıtım.",
        icon: "🌡️",
    },
    {
        title: "Zamanlayıcı ve Senaryolar",
        description: "Belirlenen saatlerde otomatik açılma/kapanma ve akıllı ev sistemlerine tam entegrasyon.",
        icon: "⏱️",
    },
];

const faqs = [
    {
        question: "Motorlu giyotin cam elektrik kesintisinde nasıl çalışır?",
        answer: "Motorlu sistemlerimizde manuel geçiş mekanizması veya opsiyonel kesintisiz güç kaynağı (UPS/akü kiti) bulunmaktadır. Elektrik kesintisinde manuel olarak da kontrol edilebilir.",
    },
    {
        question: "Hangi motor markaları kullanılıyor?",
        answer: "Ata Yapı olarak sektör lideri Somfy, Becker ve yüksek torklu yerli/ithal sertifikalı tüp motorlar kullanıyoruz. Tüm motorlar 2 yıl üretici garantilidir.",
    },
    {
        question: "Akıllı ev sistemlerine entegre edilebilir mi?",
        answer: "Evet, KNX, Zigbee, Somfy TaHoma veya standart röle modülleri ile mevcut akıllı ev otomasyon sisteminize kolayca entegre edilebilir.",
    },
    {
        question: "Motorlu giyotin cam fiyatı manuel sisteme göre ne kadar fark eder?",
        answer: "Fiyat farkı motor markasına, panel sayısına, tork gücüne ve sensör donanımına bağlıdır. Net fiyatlandırma ve avantajlı teklifler için ücretsiz keşif talep edebilirsiniz.",
    },
];

export default function MotorluGiyotinPage() {
    return (
        <>
            {/* Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Motorlu Giyotin Cam Sistemleri",
                        description: "Otomatik açılır kapanır, uzaktan kumandalı motorlu giyotin cam balkon ve teras çözümleri.",
                        provider: {
                            "@type": "LocalBusiness",
                            name: "Ata Yapı",
                            url: "https://www.xn--atayap-u9a.site",
                        },
                        areaServed: ["Balıkesir", "Edremit", "Altınoluk", "İzmir", "Çanakkale", "İstanbul"],
                        url: "https://www.xn--atayap-u9a.site/giyotin-cam/motorlu",
                    }),
                }}
            />

            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/giyotin-cam-hero.png"
                        alt="Motorlu Giyotin Cam Sistemleri"
                        fill
                        className="object-cover opacity-25"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-transparent" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                                <li><span className="mx-1">/</span></li>
                                <li><Link href="/giyotin-cam" className="hover:text-white transition-colors">Giyotin Cam</Link></li>
                                <li><span className="mx-1">/</span></li>
                                <li className="text-white font-medium">Motorlu Sistem</li>
                            </ol>
                        </nav>

                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Otomasyon & Konfor
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Motorlu Giyotin{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Cam Sistemleri
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Uzaktan kumandalı, sessiz motorlu ve akıllı sensörlü giyotin cam paneller ile
                            mekanlarınızı tek dokunuşla açık terasa dönüştürün. Maksimum konfor ve estetik.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                Ücretsiz Keşif İste
                            </Link>
                            <a
                                href="https://wa.me/905314002959?text=Merhaba%2C%20motorlu%20giyotin%20cam%20sistemi%20hakkında%20bilgi%20almak%20istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/25"
                            >
                                WhatsApp Teklif Al
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            Teknoloji & Özellikler
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            Akıllı Motorlu{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Mekanizma
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Son teknoloji motor ve otomasyon ekipmanlarıyla kesintisiz ve güvenli kullanım.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {motorFeatures.map((item, idx) => (
                            <div key={idx} className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:border-gray-200 border border-transparent transition-all duration-300 group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            Sıkça Sorulan Sorular
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center hover:text-[var(--primary)]">
                                    <span>{faq.question}</span>
                                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed text-sm">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTABlock />
        </>
    );
}
