import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABlock from "@/components/seo/CTABlock";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import {
  RulerIcon,
  FactoryIcon,
  SparkGridIcon,
  MotorIcon,
  ShieldIcon,
  WrenchIcon,
} from "@/components/icons/ArchitecturalIcons";

export const metadata: Metadata = buildProductMetadata("giyotin-cam-imalat", {
  title: "Giyotin Cam İmalatı ve Toptan Üretim | Ata Yapı Fabrika Satış",
  description:
    "Ata Yapı giyotin cam imalatı, demonte toptan sistem üretimi ve profesyonel montaj süreçleri. CNC kesim, elektrostatik fırın boya, temperli cam ve Avrupa ihracat kasalama.",
});

const productionSteps = [
  {
    step: "01",
    title: "Lazer Ölçüm & CAD Projelendirme",
    description:
      "Lazer metrelerle milimetrik saha ölçümü alınır ve CAD ortamında projeye özel profil kesim ve statik planları hazırlanır.",
    icon: <RulerIcon className="w-5 h-5" />,
  },
  {
    step: "02",
    title: "CNC Profil Kesim & İşleme",
    description:
      "Yüksek mukavemetli 6063-T5 alüminyum ekstrüzyon profiller CNC makinelerde sıfır hata toleransıyla işlenir.",
    icon: <FactoryIcon className="w-5 h-5" />,
  },
  {
    step: "03",
    title: "Elektrostatik RAL Toz Boya",
    description:
      "Tüm mimari RAL renk seçenekleri ve eloksal/ahşap yüzeyler, dış hava koşullarına dayanıklı fırın boya ile uygulanır.",
    icon: <SparkGridIcon className="w-5 h-5" />,
  },
  {
    step: "04",
    title: "Temperli Cam & Motor Entegrasyonu",
    description:
      "8mm-10mm Şişecam patentli temperli veya Isıcam paneller ile Somfy/Becker tüp motorlar montaj hattında birleştirilir.",
    icon: <MotorIcon className="w-5 h-5" />,
  },
  {
    step: "05",
    title: "Fabrika Test & Kalite Kontrol",
    description:
      "Her sistem sevkiyattan önce çoklu açma/kapama döngüsü, terazi dengesi, sızdırmazlık ve emniyet testlerinden geçirilir.",
    icon: <ShieldIcon className="w-5 h-5" />,
  },
  {
    step: "06",
    title: "İhracat Kasalama & Uzman Montaj",
    description:
      "Yurt içinde kendi teknisyen kadromuzla montaj; Avrupa sevkiyatlarında ise darbe korumalı ahşap ihracat kasalarıyla teslimat yapılır.",
    icon: <WrenchIcon className="w-5 h-5" />,
  },
];

export default function GiyotinImalatPage() {
  return (
    <>
      <ProductSeoSchema productId="giyotin-cam-imalat" />
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/giyotin-cam-detail.jpg"
            alt="Giyotin Cam İmalatı ve Montajı"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-[#0b0f19]/50" />
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
              <li className="text-white font-semibold">İmalat & Montaj</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 max-w-3xl">
            Giyotin Cam <span className="text-red-500">İmalatı & Montajı</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Aracısız, doğrudan fabrikadan son kullanıcıya ve Avrupa bayilerine yüksek
            standartlı giyotin cam üretimi.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>ÜRETİM HATTI // 01 — 06</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Mühendislikten Montaja Kusursuz İmalat
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productionSteps.map((step) => (
              <div
                key={step.step}
                className="p-7 bg-white rounded-2xl border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                    {step.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-xs font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
