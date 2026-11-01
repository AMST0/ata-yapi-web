import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Bayi ve Kurumsal Satış | Ata Yapı İş Ortaklığı",
    description:
        "Ata Yapı bayi başvurusu ve kurumsal satış. Giyotin cam, teleskopik garaj, cam balkon bayilik fırsatı. Bölgesel bayilik, toplu alım, proje bazlı satış ve işletmelere özel fiyatlandırma.",
    keywords: [
        "bayi başvurusu",
        "bayilik",
        "kurumsal satış",
        "toplu alım",
        "proje bazlı satış",
        "giyotin cam bayi",
        "cam balkon bayi",
        "teleskopik garaj bayi",
        "iş ortaklığı",
    ],
    alternates: {
        canonical: "https://www.xn--atayap-u9a.site/bayi-kurumsal",
    },
    openGraph: {
        title: "Bayi ve Kurumsal Satış | Ata Yapı",
        description: "Giyotin cam, teleskopik garaj ve cam balkon bayilik fırsatı. Kurumsal satış ve toplu alım çözümleri.",
        url: "https://www.xn--atayap-u9a.site/bayi-kurumsal",
    },
};

const partnershipModels = [
    {
        title: "Bölgesel Bayilik",
        description: "Kendi bölgenizde Ata Yapı ürünlerinin satış ve montaj yetkisini alın. Eğitim ve teknik destek sağlanır.",
        icon: "📍",
        features: ["Bölgesel münhasirlık", "Teknik eğitim", "Pazarlama desteği", "Özel fiyatlandırma"],
    },
    {
        title: "Toplu Alım",
        description: "Proje veya stok ihtiyacınız için toplu alım avantajlarından yararlanın. Hacme göre kademeli indirimler.",
        icon: "📦",
        features: ["Hacme göre indirim", "Esnek ödeme", "Hızlı tedarik", "Özel paketleme"],
    },
    {
        title: "Proje Bazlı Satış",
        description: "İnşaat projeleri, tatil köyleri, rezidanslar ve büyük ölçekli uygulamalar için özel çözümler.",
        icon: "🏗️",
        features: ["Proje bazlı fiyat", "Teknik danışmanlık", "Özel üretim", "Montaj ekibi"],
    },
    {
        title: "İşletmelere Özel",
        description: "Restoran, otel, kafe ve ticari işletmeler için özel tasarım ve kurumsal anlaşmalar.",
        icon: "🏢",
        features: ["Kurumsal fatura", "Özel tasarım", "Bakım anlaşması", "Hızlı servis"],
    },
];

const advantages = [
    { title: "Güçlü Ürün Portföyü", description: "Giyotin cam, teleskopik garaj, cam balkon, sineklik, tente — geniş ürün yelpazesi.", icon: "🎯" },
    { title: "Teknik Eğitim", description: "Ürün bilgisi, satış teknikleri ve montaj eğitimi ile tam donanımlı başlangıç.", icon: "📚" },
    { title: "Pazarlama Desteği", description: "Dijital ve fiziksel pazarlama materyalleri, kurumsal kimlik kullanımı.", icon: "📢" },
    { title: "Rekabetçi Fiyat", description: "Bayi özel fiyatlandırma ile sektörde rekabetçi marjlar.", icon: "💰" },
    { title: "Lojistik Destek", description: "Hızlı sevkiyat, güvenli paketleme ve bölgesel depo imkanı.", icon: "🚚" },
    { title: "Satış Sonrası Destek", description: "Teknik destek hattı, yedek parça tedariki ve garanti desteği.", icon: "🛠️" },
];

const processSteps = [
    { step: 1, title: "Başvuru", description: "Online formumuzu doldurun veya bizi arayın. Bayilik şartları hakkında bilgi alın.", icon: "📝" },
    { step: 2, title: "Görüşme", description: "Uzman ekibimiz ile bölge, hacim ve iş modeli üzerine detaylı görüşme.", icon: "🤝" },
    { step: 3, title: "Anlaşma", description: "Karşılıklı anlaşma sonrası bayilik protokolü imzalanır.", icon: "📋" },
    { step: 4, title: "Başlangıç", description: "Eğitim, pazarlama materyalleri ve ilk ürün tedariki ile iş ortaklığı başlar.", icon: "🚀" },
];

export default function BayiKurumsalPage() {
    return (
        <>
            {/* Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Bayi ve Kurumsal Satış",
                        description: "Ata Yapı bayi başvurusu ve kurumsal satış fırsatları.",
                        url: "https://www.xn--atayap-u9a.site/bayi-kurumsal",
                        breadcrumb: {
                            "@type": "BreadcrumbList",
                            itemListElement: [
                                { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.xn--atayap-u9a.site" },
                                { "@type": "ListItem", position: 2, name: "Bayi ve Kurumsal Satış", item: "https://www.xn--atayap-u9a.site/bayi-kurumsal" },
                            ],
                        },
                    }),
                }}
            />

            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70" />
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <div className="absolute top-1/4 right-0 w-96 h-1 bg-gradient-to-l from-[var(--primary)] to-transparent" />
                    <div className="absolute top-1/3 right-0 w-72 h-1 bg-gradient-to-l from-[var(--secondary)] to-transparent" />
                    <div className="absolute top-1/2 right-0 w-80 h-1 bg-gradient-to-l from-[var(--accent)] to-transparent" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-2xl">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                                <li><span className="mx-1">/</span></li>
                                <li className="text-white font-medium">Bayi & Kurumsal Satış</li>
                            </ol>
                        </nav>

                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            İş Ortaklığı Fırsatı
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Bayi ve{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Kurumsal Satış
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Giyotin cam sistemleri, teleskopik garaj ve cam balkon alanında
                            güçlü bir iş ortaklığı kurun. Bölgesel bayilik, toplu alım ve
                            proje bazlı satış çözümleri sunuyoruz.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#basvuru"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                Bayi Başvurusu
                            </a>
                            <a
                                href="https://wa.me/905314002959?text=Merhaba%2C%20bayilik%20başvurusu%20hakkında%20bilgi%20almak%20istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/25"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp İle İletişim
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partnership Models */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            İş Ortaklığı Modelleri
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            Size Uygun{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                İş Modeli
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Farklı ihtiyaçlara yönelik esnek iş ortaklığı modelleri sunuyoruz.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {partnershipModels.map((model, index) => (
                            <div key={index} className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1">
                                <div className="text-4xl mb-4">{model.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                                    {model.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{model.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {model.features.map((feature) => (
                                        <span key={feature} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-100">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/10 rounded-full text-sm font-semibold text-[var(--secondary)] mb-4">
                            Avantajlar
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            Neden Ata Yapı{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)]">
                                İş Ortağı?
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((item, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-gray-200 border border-transparent transition-all duration-300">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
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
                            Başvuru Süreci
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            Nasıl Bayi Olunur?
                        </h2>
                        <p className="text-gray-400 text-lg">4 adımda Ata Yapı iş ortağı olun.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((item) => (
                            <div key={item.step} className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {item.step}
                                </div>
                                <div className="text-4xl mb-4 mt-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / Application Form CTA */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50" id="basvuru">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            Başvuru
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            Bayi Başvurusu veya{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Kurumsal Teklif
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Bayilik başvurusu, kurumsal teklif veya toplu alım hakkında bilgi almak için
                            iletişim sayfamızdan bize ulaşın veya doğrudan WhatsApp üzerinden yazın.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl shadow-red-500/25"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                İletişim Formu
                            </Link>
                            <a
                                href="https://wa.me/905314002959?text=Merhaba%2C%20bayilik%20başvurusu%20hakkında%20bilgi%20almak%20istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp İle Başvur
                            </a>
                        </div>
                        <p className="mt-6 text-gray-500 text-sm">
                            Telefon: <a href="tel:+905314002959" className="text-[var(--primary)] font-medium hover:underline">0531 400 29 59</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Internal Links */}
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/giyotin-cam" className="text-gray-600 hover:text-[var(--primary)] transition-colors">Giyotin Cam Sistemleri</Link>
                        <span className="text-gray-300">·</span>
                        <Link href="/cam-balkon" className="text-gray-600 hover:text-[var(--primary)] transition-colors">Cam Balkon</Link>
                        <span className="text-gray-300">·</span>
                        <Link href="/bolge/balikesir-giyotin-cam" className="text-gray-600 hover:text-[var(--primary)] transition-colors">Balıkesir</Link>
                        <span className="text-gray-300">·</span>
                        <Link href="/bolge/izmir-giyotin-cam" className="text-gray-600 hover:text-[var(--primary)] transition-colors">İzmir</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
