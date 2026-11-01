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
  ShieldIcon,
  LayersIcon,
  SunWindIcon,
  BuildingIcon,
  CheckIcon,
  SparkGridIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/icons/ArchitecturalIcons";

export const metadata: Metadata = buildProductMetadata("cam-balkon-isicamli", {
  title: "Isıcamlı Cam Balkon Sistemleri & Fiyatları | Çift Cam Yalıtım | Ata Yapı",
  description:
    "Isıcamlı (çift camlı) cam balkon sistemleri ile 4 mevsim oda konforu. Yüksek ısı ve ses yalıtımı, enerji tasarrufu, temperli çift cam güvenliği ve ücretsiz keşif.",
});

const faqs = [
  {
    question: "Isıcamlı cam balkon nedir?",
    answer:
      "Isıcamlı cam balkon, her iki yüzeyi de temperli çift cam (örneğin 4+12+4 mm veya 4+16+4 mm) paneller ve ısı bariyerli alüminyum profiller kullanılarak üretilen yüksek yalıtımlı sistemdir.",
  },
  {
    question: "Isıcamlı cam balkon kışın odaya dahil edilebilir mi?",
    answer:
      "Evet, tek camlı sistemlere kıyasla ısı kaybını %50'ye varan oranda düşürdüğü için balkonunuzu kış bahçesi, çalışma odası veya oturma alanı olarak dört mevsim kullanabilirsiniz.",
  },
  {
    question: "Isıcamlı cam balkon ses yalıtımı sağlar mı?",
    answer:
      "Çift cam katmanı ve ara hava/argon boşluğu sayesinde cadde ve trafik gürültüsünü ciddi ölçüde sönümler.",
  },
  {
    question: "Çift cam arasında buğulanma olur mu?",
    answer:
      "Fabrikasyon nem alıcı çıtalar ve çift kademeli butil/tiyokol sızdırmazlık uygulandığı için iki cam arasında buğulanma meydana gelmez.",
  },
];

const benefits = [
  {
    index: "01",
    title: "Maksimum Termal Yalıtım",
    description: "Temperli çift cam kombinasyonu ile kış aylarında %45-50 ısı kaybı önleme.",
    icon: <ShieldIcon className="w-5 h-5" />,
  },
  {
    index: "02",
    title: "Yüksek Akustik Konfor",
    description: "Ana cadde ve şehir gürültüsünü belirgin biçimde kesen çift katmanlı cam bariyeri.",
    icon: <LayersIcon className="w-5 h-5" />,
  },
  {
    index: "03",
    title: "Enerji Tasarrufu",
    description: "Komşu odaların ısı kaybını düşürerek doğalgaz ve iklimlendirme giderlerini azaltır.",
    icon: <BuildingIcon className="w-5 h-5" />,
  },
  {
    index: "04",
    title: "4 Mevsim Yaşam Alanı",
    description: "Yazın güneş ısısını kırar, kışın soğuk rüzgârı dışarıda tutar.",
    icon: <SunWindIcon className="w-5 h-5" />,
  },
  {
    index: "05",
    title: "Terleme & Buğu Önleyici",
    description: "Alüminyum ara fitiller ve EPDM contalar sayesinde yoğuşmayı minimize eder.",
    icon: <CheckIcon className="w-5 h-5" />,
  },
  {
    index: "06",
    title: "Güçlendirilmiş Kasa & Rulman",
    description: "Çift cam ağırlığını yıllarca sarsıntısız taşıyan ağır hizmet rulman mimarisi.",
    icon: <SparkGridIcon className="w-5 h-5" />,
  },
];

export default function IsiCamliPage() {
  return (
    <>
      <ProductSeoSchema productId="cam-balkon-isicamli" />
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Cam Balkon", href: "/cam-balkon" },
              { label: "Isıcamlı Sistem" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/cam-balkon-service.png"
            alt="Isıcamlı Cam Balkon"
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
              <span>ÇİFT CAM TERMAL YALITIM SİSTEMİ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Isıcamlı <span className="text-red-500">Cam Balkon</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Temperli çift cam teknolojisi ve alüminyum sızdırmazlık fitilleri ile balkonunuzu
              dört mevsim gerçek bir yaşam odasına dönüştürün.
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
                href={getWhatsAppUrl("Merhaba, ısıcamlı cam balkon sistemi için fiyat teklifi almak istiyorum.")}
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

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            Isıcamlı Sistemin Teknik Avantajları
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit) => (
              <div
                key={benefit.index}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                    {benefit.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {benefit.index}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
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
              Tek Cam vs Isıcamlı Sistem Karşılaştırma
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 text-left font-semibold">Performans Kriteri</th>
                    <th className="p-4 text-center font-semibold">8mm Tek Cam</th>
                    <th className="p-4 text-center font-semibold bg-red-600">Isıcamlı (Çift Cam)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-4 font-medium text-slate-800">Isı Yalıtım Performansı</td>
                    <td className="p-4 text-center text-slate-600">Standart Koruma</td>
                    <td className="p-4 text-center font-bold text-slate-900 bg-red-50/50">Maksimum Yalıtım</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800">Ses İzolasyonu</td>
                    <td className="p-4 text-center text-slate-600">Orta</td>
                    <td className="p-4 text-center font-bold text-slate-900 bg-red-50/50">Yüksek Akustik Bariyer</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800">Enerji Tasarrufu</td>
                    <td className="p-4 text-center text-slate-600">%15</td>
                    <td className="p-4 text-center font-bold text-slate-900 bg-red-50/50">%45 — %50</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800">Cam Kombinasyonu</td>
                    <td className="p-4 text-center text-slate-600">8mm Temperli</td>
                    <td className="p-4 text-center font-bold text-slate-900 bg-red-50/50">4+12+4 / 4+16+4 Temperli</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <WhyAtaYapi />

      <FAQSection title="Isıcamlı Cam Balkon Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Diğer Cam Balkon Sistemleri
          </h2>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <Link
              href="/cam-balkon/surme"
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
            >
              Sürme Cam Balkon
            </Link>
            <Link
              href="/cam-balkon/katlanir"
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
            >
              Katlanır Cam Balkon
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
        title="Isıcamlı Cam Balkon Teklifi Alın"
        description="Dört mevsim yalıtımlı cam balkon için ücretsiz keşif ve metraj teklifi isteyin."
      />
    </>
  );
}
