import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/seo/FAQSection";
import CTABlock from "@/components/seo/CTABlock";
import WhyAtaYapi from "@/components/seo/WhyAtaYapi";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import {
  LayersIcon,
  ShieldIcon,
  WrenchIcon,
  RulerIcon,
  SparkGridIcon,
  BuildingIcon,
  ArrowRightIcon,
} from "@/components/icons/ArchitecturalIcons";

export const metadata: Metadata = buildProductMetadata("cam-balkon-surme", {
  title: "Sürme Cam Balkon Sistemleri & Fiyatları | Eşikli & Eşiksiz | Ata Yapı",
  description:
    "Sürme cam balkon sistemleri ile ekonomik, yer kaplamayan mimari çözüm. Çok raylı yatay kayar paneller, eşikli ve eşiksiz seçenekler, ücretsiz keşif.",
});

const faqs = [
  {
    question: "Sürme cam balkon sistemi nasıl çalışır?",
    answer:
      "Sürme cam balkon sisteminde cam paneller 3 veya 5 kanallı alüminyum ray üzerinde yatay kayarak birbirinin arkasına toplanır; iç mekânda kanat açılım payı işgal etmez.",
  },
  {
    question: "Eşikli ve eşiksiz sürme sistem farkı nedir?",
    answer:
      "Eşiksiz sürme sistemler teras, kafe ve bahçe çıkışlarında takılma yapmayan düz zemin geçişi sunar. Eşikli sürme sistemler ise yüksek katlı balkonlarda maksimum su ve rüzgâr sızdırmazlığı sağlar.",
  },
  {
    question: "Sürme cam balkon rüzgârda ses yapar mı?",
    answer:
      "Kenetli dikey alüminyum profiller ve yüksek yoğunluklu fırça contalar sayesinde kanatlar birbirine kilitlenir; rüzgâr sızıntısı ve titreşim minimize edilir.",
  },
  {
    question: "Sürme cam balkonda ısıcam kullanılabilir mi?",
    answer:
      "Evet, hem 8mm-10mm tek temperli camlı hem de yüksek ısı yalıtımlı çift camlı (Isıcamlı) sürme sistem imalatımız mevcuttur.",
  },
];

const features = [
  {
    index: "01",
    title: "Sıfır İç Mekân İşgali",
    description: "Kanatlar kendi ray ekseninde kaydığı için balkon mobilyalarına ve perdelere çarpmaz.",
    icon: <LayersIcon className="w-5 h-5" />,
  },
  {
    index: "02",
    title: "Eşikli & Eşiksiz Seçenek",
    description: "Teras ve ticari girişler için engelsiz eşiksiz alt ray, balkonlar için yalıtımlı kasa.",
    icon: <RulerIcon className="w-5 h-5" />,
  },
  {
    index: "03",
    title: "Kenetli Rüzgâr Kilidi",
    description: "Kanat birleşimlerinde birbirine kenetlenen özel alüminyum bini profilleri.",
    icon: <ShieldIcon className="w-5 h-5" />,
  },
  {
    index: "04",
    title: "Ağır Hizmet Rulmanları",
    description: "Geniş ve yüksek cam panelleri tek parmak hareketiyle sessizce taşıyan rulmanlar.",
    icon: <WrenchIcon className="w-5 h-5" />,
  },
  {
    index: "05",
    title: "Ekonomik & Uzun Ömürlü",
    description: "Az sayıda mekanik parça sayesinde minimum bakım ihtiyacı ve rekabetçi maliyet.",
    icon: <BuildingIcon className="w-5 h-5" />,
  },
  {
    index: "06",
    title: "Minimalist Profil Kesiti",
    description: "İnce çerçeve hatları ile modern konut ve restoran mimarisine tam uyum.",
    icon: <SparkGridIcon className="w-5 h-5" />,
  },
];

export default function SurmeCamBalkonPage() {
  return (
    <>
      <ProductSeoSchema productId="cam-balkon-surme" />
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Cam Balkon", href: "/cam-balkon" },
              { label: "Sürme Sistem" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/cam-balkon-2.png"
            alt="Sürme Cam Balkon"
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
              <span>EŞİKLİ & EŞİKSİZ YATAY SÜRME</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Sürme <span className="text-red-500">Cam Balkon</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Çok kanallı alüminyum ray üzerinde süzülen cam paneller ile iç mekân alanı
              kaybetmeden ergonomik, pratik ve ekonomik kapatma çözümü.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/iletisim"
                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <span>Ücretsiz Keşif</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/#hesaplayici"
                className="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base border border-white/15 transition-colors"
              >
                <RulerIcon className="w-4 h-4" />
                <span>Ölçü Hesapla</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Sürme Cam Balkon Nedir?
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                Sürme cam balkon sistemleri, cam kanatların 3 veya 5 yollu alüminyum ray profili
                üzerinde yatay eksende kayarak birbirinin arkasına toplandığı sistemdir. İçeriye
                doğru katlanan kanat olmadığı için dar balkonlarda, teras çıkışlarında ve kafe
                bölmelerinde maksimum kullanım alanı bırakır.
              </p>
              <p>
                Projeye göre 8 mm / 10 mm temperli tek cam veya yüksek ısı yalıtımlı çift cam
                (Isıcam) ile üretilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            Sürme Cam Balkon Avantajları
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

      <WhyAtaYapi />

      <FAQSection title="Sürme Cam Balkon Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

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
        title="Sürme Cam Balkon Teklifi Alın"
        description="Balkon ve teras ölçülerinize özel net fiyat teklifi için ücretsiz keşif randevusu alın."
      />
    </>
  );
}
