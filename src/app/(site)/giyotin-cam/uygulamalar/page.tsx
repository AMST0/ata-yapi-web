import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Giyotin Cam Uygulama Alanları | Restoran, Kafe, Villa & Teras | Ata Yapı",
    description:
        "Giyotin cam sistemleri uygulama alanları: Kafe ve restoran dış mekanları, villa terasları, kış bahçeleri, çatı katları, pergola ve havuz kenarı kapatma. Balıkesir, İzmir, Çanakkale ve İstanbul.",
    keywords: [
        "giyotin cam uygulamaları",
        "kafe giyotin cam",
        "restoran giyotin cam",
        "teras giyotin cam",
        "kış bahçesi giyotin cam",
        "pergola giyotin cam",
        "villa cam kapatma",
    ],
    alternates: {
        canonical: "https://www.xn--atayap-u9a.site/giyotin-cam/uygulamalar",
    },
};

const applications = [
    {
        title: "Kafe & Restoranlar",
        description: "Müşterilerinize 4 mevsim ferah ve kesintisiz manzara sunun. Açık havada oturma konforu ile kapalı mekan korumasını birleştirin.",
        icon: "☕",
        benefits: ["Masa kapasitesini artırır", "Yıl boyu dış mekan geliri", "Sigara alanı yönetimi", "Prestijli kurumsal görünüm"],
    },
    {
        title: "Villa & Müstakil Teraslar",
        description: "Geniş teras ve verandalarınızı yağmur, rüzgar ve soğuktan koruyarak evin en keyifli yaşam alanına dönüştürün.",
        icon: "🏡",
        benefits: ["Manzarayı engellemez", "Korkuluk görevi görür", "Çocuk ve evcil hayvan güvenliği", "Yüksek ısı yalıtımı"],
    },
    {
        title: "Kış Bahçeleri & Pergola Kapatma",
        description: "Biyoklimatik veya kumaş pergola sistemlerinin etrafını giyotin cam ile kapatarak tam izole kış bahçesi oluşturun.",
        icon: "🌿",
        benefits: ["Pergola sistemleri ile tam uyum", "Dikey hareketle yer tasarrufu", "Uzaktan kumanda ile tek tuş kontrol", "Estetik bütünlük"],
    },
    {
        title: "Çatı Katları & Penthouse",
        description: "Yüksek rüzgar yüküne maruz kalan çatı ve teras alanlarında güçlendirilmiş profillerle güvenli kapatma.",
        icon: "🏙️",
        benefits: ["Fırtına ve rüzgar dayanımı", "Panoramik şehir/deniz manzarası", "Güvenlikli temperli cam", "Ses izolasyonu"],
    },
    {
        title: "Otel & Tatil Köyleri",
        description: "Havuz başı bar, lobi terasları ve etkinlik alanlarında esnek açık/kapalı mekan yönetimi.",
        icon: "🏨",
        benefits: ["Ziyaretçi memnuniyeti", "Hızlı hava tahliyesi", "Yoğun kullanıma dayanıklı mekanizma", "Kurumsal çözüm"],
    },
    {
        title: "Ofis & Ticari Binalar",
        description: "Şirket balkonları, dinlenme alanları ve dış cephe toplantı odalarında modern cam mimarisi.",
        icon: "🏢",
        benefits: ["Modern ofis mimarisi", "Doğal ışık maksimizasyonu", "Enerji verimliliği", "Ergonomik kullanım"],
    },
];

export default function GiyotinUygulamalarPage() {
    return (
        <>
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="container">
                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex items-center gap-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                            <li><span className="mx-1">/</span></li>
                            <li><Link href="/giyotin-cam" className="hover:text-white transition-colors">Giyotin Cam</Link></li>
                            <li><span className="mx-1">/</span></li>
                            <li className="text-white font-medium">Uygulamalar</li>
                        </ol>
                    </nav>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                        Giyotin Cam{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                            Uygulama Alanları
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                        Ticari işletmelerden müstakil villalara kadar her mekana özel projelendirilmiş dikey sürgülü giyotin cam uygulamaları.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {applications.map((app, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                                <div className="text-4xl mb-4">{app.icon}</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>{app.title}</h2>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{app.description}</p>
                                <ul className="space-y-2">
                                    {app.benefits.map((benefit, bIdx) => (
                                        <li key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                                            <span className="text-[var(--primary)]">✓</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-900 text-white text-center">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Mekanınız İçin Özel Çözüm Üretelim</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">Projenizin fotoğraflarını ve ölçülerini paylaşın, aynı gün içerisinde size özel keşif ve fiyat çalışması sunalım.</p>
                    <Link href="/iletisim" className="btn-press bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold px-8 py-4 rounded-xl inline-block shadow-lg">
                        Ücretsiz Keşif Talep Edin
                    </Link>
                </div>
            </section>
        </>
    );
}
