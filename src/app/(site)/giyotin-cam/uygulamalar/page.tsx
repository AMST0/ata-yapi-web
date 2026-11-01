import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABlock from "@/components/seo/CTABlock";
import {
  BuildingIcon,
  SunWindIcon,
  LayersIcon,
  ShieldIcon,
  SparkGridIcon,
  CheckIcon,
} from "@/components/icons/ArchitecturalIcons";

export const metadata: Metadata = {
  title: "Giyotin Cam Uygulama Alanları | Restoran, Kafe, Villa & Teras | Ata Yapı",
  description:
    "Giyotin cam sistemleri uygulama alanları: Kafe ve restoran dış mekanları, villa terasları, kış bahçeleri, çatı katları, pergola ve havuz kenarı kapatma.",
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
    index: "01",
    title: "Kafe & Restoran Cepheleri",
    description:
      "Müşterilerinize 4 mevsim ferah ve kesintisiz manzara sunun. Açık havada oturma konforu ile kapalı mekân korumasını tek tuşla birleştirin.",
    icon: <BuildingIcon className="w-5 h-5" />,
    benefits: [
      "Masa kapasitesini artırır",
      "Yıl boyu dış mekân geliri",
      "Havalandırma mevzuatına uyumlu",
      "Prestijli kurumsal cephe",
    ],
  },
  {
    index: "02",
    title: "Villa & Müstakil Teraslar",
    description:
      "Geniş teras ve verandalarınızı yağmur, rüzgâr ve soğuktan koruyarak konutunuzun en keyifli yaşam alanına dönüştürün.",
    icon: <LayersIcon className="w-5 h-5" />,
    benefits: [
      "Panoramik manzarayı kesmez",
      "Açık konumda cam korkuluk görevi",
      "Çocuk ve evcil hayvan güvenliği",
      "Isıcamlı yüksek yalıtım",
    ],
  },
  {
    index: "03",
    title: "Kış Bahçeleri & Pergola Kapatma",
    description:
      "Biyoklimatik veya motorlu pergola sistemlerinin çevresini giyotin cam ile kapatarak tam yalıtımlı kış bahçesi oluşturun.",
    icon: <SunWindIcon className="w-5 h-5" />,
    benefits: [
      "Pergola dikmeleriyle tam uyum",
      "Dikey hareketle sıfır alan kaybı",
      "Uzaktan kumanda ile senkron kontrol",
      "Mimari estetik bütünlük",
    ],
  },
  {
    index: "04",
    title: "Çatı Katları & Penthouse",
    description:
      "Yüksek rüzgâr yüküne maruz kalan çatı ve teras alanlarında et kalınlığı artırılmış alüminyum profillerle güvenli kapatma.",
    icon: <ShieldIcon className="w-5 h-5" />,
    benefits: [
      "Yüksek fırtına ve rüzgâr dayanımı",
      "Kesintisiz şehir ve deniz manzarası",
      "Temperli emniyet camı",
      "Üstün akustik izolasyon",
    ],
  },
  {
    index: "05",
    title: "Otel & Turizm Tesisleri",
    description:
      "Havuz başı restoran, lobi terasları ve etkinlik salonlarında mevsime göre esnek açık/kapalı mekân yönetimi.",
    icon: <SparkGridIcon className="w-5 h-5" />,
    benefits: [
      "Yüksek misafir konforu",
      "Hızlı doğal havalandırma",
      "Yoğun ticari kullanıma dayanıklı",
      "Özel RAL renk seçenekleri",
    ],
  },
  {
    index: "06",
    title: "Kurumsal Ofis & Ticari Binalar",
    description:
      "Şirket terasları, sosyal dinlenme alanları ve dış cephe toplantı salonlarında modern cam mimarisi.",
    icon: <BuildingIcon className="w-5 h-5" />,
    benefits: [
      "Çağdaş mimari cephe dili",
      "Maksimum gün ışığı kazanımı",
      "Enerji verimliliği",
      "Sıfır eşik / ergonomik kullanım",
    ],
  },
];

export default function GiyotinUygulamalarPage() {
  return (
    <>
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/giyotin-cam-terrace.png"
            alt="Giyotin Cam Uygulama Alanları"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-[#0b0f19]/40" />
          <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
        </div>
        <div className="container relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/giyotin-cam" className="hover:text-white transition-colors">
                  Giyotin Cam
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-semibold">Uygulamalar</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 max-w-3xl">
            Giyotin Cam <span className="text-red-500">Uygulama Alanları</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Ticari işletmelerden müstakil villalara kadar her mekâna özel projelendirilmiş
            dikey sürgülü motorlu giyotin cam çözümleri.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app.index}
                className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                    {app.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {app.index}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2.5">{app.title}</h2>
                <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                  {app.description}
                </p>
                <ul className="space-y-2 pt-4 border-t border-slate-100">
                  {app.benefits.map((benefit, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-700"
                    >
                      <CheckIcon className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
