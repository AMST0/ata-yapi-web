import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/seo/FAQSection";
import CTABlock from "@/components/seo/CTABlock";
import WhyAtaYapi from "@/components/seo/WhyAtaYapi";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import { getWhatsAppUrl } from "@/lib/constants";
import {
  LayersIcon,
  ShieldIcon,
  SunWindIcon,
  WrenchIcon,
  SparkGridIcon,
  CheckIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/icons/ArchitecturalIcons";

export const metadata: Metadata = buildProductMetadata("cam-balkon-katlanir", {
  title: "Katlanır Cam Balkon Sistemleri & Fiyatları | %100 Açılır | Ata Yapı",
  description:
    "Katlanır cam balkon sistemleri ile %100 açılım imkanı. Paslanmaz rulman takımı, 8mm/10mm temperli cam, şık mimari tasarım ve doğrudan üretici fiyatları.",
});

const faqs = [
  {
    question: "Katlanır cam balkon nasıl çalışır?",
    answer:
      "Katlanır cam balkon sisteminde cam paneller paslanmaz çelik rulmanlar üzerinde kayarak köşede akordiyon gibi katlanır ve balkonun tamamı açılır.",
  },
  {
    question: "Katlanır cam balkon tamamen açılır mı?",
    answer:
      "Evet, katlanır cam balkon sistemleri %100 açılım imkânı sunar. Tüm paneller içe doğru katlanarak toplanır ve camların dış yüzeyi de güvenle silinebilir.",
  },
  {
    question: "Katlanır cam balkon fiyatları neye göre belirlenir?",
    answer:
      "Fiyatlar balkonun toplam metrekaresi, yüksekliği, alüminyum profil rengi (antrasit, bronz, ahşap desen vb.) ve cam kalınlığına (8mm/10mm/Isıcam) göre hesaplanır.",
  },
  {
    question: "Katlanır cam balkon ne kadar sürede monte edilir?",
    answer:
      "Standart bir balkon için montaj 1 iş günü içinde tamamlanır. Özel imalat süresi dahil toplam teslimat yaklaşık 5-7 iş günü sürer.",
  },
  {
    question: "Katlanır cam balkon rüzgâra ve yağmura dayanıklı mı?",
    answer:
      "Evet, damlalıklı kasa profilleri, alüminyum ara fitiller ve emniyetli çocuk kilidi mekanizması sayesinde şiddetli rüzgâr ve yağmura karşı yüksek koruma sağlar.",
  },
];

const features = [
  {
    index: "01",
    title: "%100 Tam Açılım",
    description: "Tüm kanatları tek kenara katlayarak balkonunuzu tamamen açık terasa dönüştürün.",
    icon: <LayersIcon className="w-5 h-5" />,
  },
  {
    index: "02",
    title: "Kolay Dış Yüzey Temizliği",
    description: "İçe katlanan kanat mekanizması sayesinde sarkmadan güvenli cam temizliği.",
    icon: <SparkGridIcon className="w-5 h-5" />,
  },
  {
    index: "03",
    title: "Kesintisiz Panoramik Manzara",
    description: "Dikey kayıt profili olmadan şeffaf ve modern cephe görünümü.",
    icon: <SunWindIcon className="w-5 h-5" />,
  },
  {
    index: "04",
    title: "Paslanmaz Çelik Rulmanlar",
    description: "Çift sıra paslanmaz rulman takımı ile yıllarca takılmadan sessiz hareket.",
    icon: <WrenchIcon className="w-5 h-5" />,
  },
  {
    index: "05",
    title: "8mm / 10mm Temperli Cam",
    description: "Darbelere karşı 5 kat güçlendirilmiş Şişecam patentli emniyet camı.",
    icon: <ShieldIcon className="w-5 h-5" />,
  },
  {
    index: "06",
    title: "Çocuk Emniyet Kilidi",
    description: "İçeriden kilitlenebilen yüksek güvenlikli ispanyolet ve kilit mekanizması.",
    icon: <CheckIcon className="w-5 h-5" />,
  },
];

export default function KatlanirCamBalkonPage() {
  return (
    <>
      <ProductSeoSchema productId="cam-balkon-katlanir" />
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Cam Balkon", href: "/cam-balkon" },
              { label: "Katlanır Sistem" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/cam-balkon-1.png"
            alt="Katlanır Cam Balkon"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-[#0b0f19]/40" />
          <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold tracking-wide text-slate-200 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>%100 AÇILIR PANORAMİK SİSTEM</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Katlanır <span className="text-red-500">Cam Balkon</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Cam panellerin tamamen katlanarak toplandığı esnek mimari sistem. Balkonunuzu
              istediğinizde %100 açık hale getirin, dört mevsim konforla kullanın.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/iletisim"
                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <span>Ücretsiz Keşif</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsAppUrl("Merhaba, katlanır cam balkon sistemi için fiyat teklifi almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Katlanır Cam Balkon Nedir?
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                Katlanır cam balkon sistemleri, temperli cam kanatların alüminyum ray üzerinde
                kayarak köşe noktasında içe doğru katlandığı modern cephe kapatma çözümüdür. En
                önemli avantajı balkon açıklığının %100 oranında kullanılabilmesidir.
              </p>
              <p>
                Düz, L tipi, U tipi ve oval balkon geometrilerinin tamamına milimetrik olarak
                uygulanabilir. 8 mm veya 10 mm temperli güvenlik camı ve su tahliye kanallı
                alüminyum profiller ile yüksek rüzgâr ve yağmur dayanımı sunar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            Katlanır Cam Balkon Teknik Avantajları
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.index}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {feature.index}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Katlanır vs Sürme Sistem Karşılaştırma
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 text-left font-semibold">Teknik Kriter</th>
                    <th className="p-4 text-center font-semibold bg-red-600">Katlanır Sistem</th>
                    <th className="p-4 text-center font-semibold">Sürme Sistem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-4 font-medium text-slate-800">Net Açılım Oranı</td>
                    <td className="p-4 text-center font-bold text-slate-900 bg-red-50/50">%100</td>
                    <td className="p-4 text-center text-slate-600">%75 — %80</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800">Dış Cam Temizliği</td>
                    <td className="p-4 text-center font-bold text-slate-900 bg-red-50/50">İçeriden Tam Erişim</td>
                    <td className="p-4 text-center text-slate-600">Ray Üzerinden</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800">L / U Balkon Uyumu</td>
                    <td className="p-4 text-center font-bold text-slate-900 bg-red-50/50">Köşe Dönüşlü Tam Uyum</td>
                    <td className="p-4 text-center text-slate-600">Sabit Köşe Kayıtlı</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800">Eşik Yapısı</td>
                    <td className="p-4 text-center font-semibold text-slate-800 bg-red-50/50">Damlalıklı Kasa</td>
                    <td className="p-4 text-center text-slate-600">Eşikli / Eşiksiz Ray</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <WhyAtaYapi />

      <FAQSection title="Katlanır Cam Balkon Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Diğer Cam Balkon Sistemleri
          </h2>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <Link
              href="/cam-balkon/isi-camli"
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
            >
              Isıcamlı Cam Balkon
            </Link>
            <Link
              href="/cam-balkon/surme"
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
            >
              Sürme Cam Balkon
            </Link>
            <Link
              href="/cam-balkon"
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
            >
              Tüm Cam Balkon Sistemleri →
            </Link>
          </div>
        </div>
      </section>

      <CTABlock
        title="Katlanır Cam Balkon Teklifi Alın"
        description="%100 açılım ve doğrudan imalatçı fiyat avantajı için ücretsiz keşif randevusu oluşturun."
      />
    </>
  );
}
