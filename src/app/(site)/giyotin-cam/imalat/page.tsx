import type { Metadata } from "next";
import Link from "next/link";
import CTABlock from "@/components/seo/CTABlock";

export const metadata: Metadata = {
    title: "Giyotin Cam İmalatı ve Montajı | Ata Yapı Kendi Üretimimiz",
    description:
        "Ata Yapı giyotin cam imalatı ve profesyonel montaj süreçleri. Kendi atölyemizde CNC kesim, elektrostatik fırın boya, temperli cam ve titiz kalite kontrol. 2 yıl garanti.",
    keywords: [
        "giyotin cam imalatı",
        "giyotin cam üretimi",
        "giyotin cam montajı",
        "giyotin cam fabrikası",
        "yerli giyotin cam üretici",
        "giyotin cam profil üretimi",
    ],
    alternates: {
        canonical: "https://www.xn--atayap-u9a.site/giyotin-cam/imalat",
    },
};

const productionSteps = [
    {
        step: 1,
        title: "Hassas Ölçüm & Projelendirme",
        description: "Lazer metrelerle milimetrik saha ölçümü alınır ve CAD ortamında projeye özel profil kesim planları hazırlanır.",
        icon: "📐",
    },
    {
        step: 2,
        title: "CNC Kesim & İşleme",
        description: "Yüksek mukavemetli alüminyum ekstrüzyon profiller CNC makinelerde sıfır hata toleransıyla işlenir.",
        icon: "⚙️",
    },
    {
        step: 3,
        title: "Elektrostatik Toz Boya",
        description: "Tüm RAL renk seçenekleri ve ahşap desen transferi, korozyona ve UV ışınlarına dayanıklı fırın boya ile uygulanır.",
        icon: "🎨",
    },
    {
        step: 4,
        title: "Cam & Motor Entegrasyonu",
        description: "8mm-10mm Şişecam patentli temperli/ısıcam paneller ve test edilmiş tüp motorlar montaj hattında birleştirilir.",
        icon: "🔩",
    },
    {
        step: 5,
        title: "Fabrika Test & Kalite Kontrol",
        description: "Her sistem atölyeden çıkmadan önce 50+ açma/kapama döngüsü, su sızdırmazlık ve güvenlik testlerinden geçirilir.",
        icon: "🔬",
    },
    {
        step: 6,
        title: "Uzman Ekip Montajı",
        description: "Kendi kadromuzdaki sertifikalı montaj teknisyenleri tarafından temiz, hızlı ve garantili saha kurulumu yapılır.",
        icon: "✅",
    },
];

export default function GiyotinImalatPage() {
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
                            <li className="text-white font-medium">İmalat & Montaj</li>
                        </ol>
                    </nav>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                        Giyotin Cam{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                            İmalatı & Montajı
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                        Aracısız, doğrudan imalattan tüketiciye ve bayilere yüksek kaliteli giyotin sistemleri. Kendi atölyemizde yerli üretim gücü.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            Üretim Süreci
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            A'dan Z'ye Kusursuz İmalat
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {productionSteps.map((step) => (
                            <div key={step.step} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all relative">
                                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white font-bold flex items-center justify-center mb-4">
                                    {step.step}
                                </div>
                                <div className="text-3xl mb-3">{step.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{step.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTABlock />
        </>
    );
}
