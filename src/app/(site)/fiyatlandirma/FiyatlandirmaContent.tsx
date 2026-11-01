"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { getWhatsAppUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import BalconyCalculator from "@/components/calculator/BalconyCalculator";
import CTABlock from "@/components/seo/CTABlock";
import {
  RulerIcon,
  MotorIcon,
  ShieldIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function FiyatlandirmaContent() {
  const { t, language } = useLanguage();
  const p = t.pages.fiyat;

  const factors = [
    {
      index: "01",
      title: p.fact1_t,
      description: p.fact1_d,
      icon: <RulerIcon className="w-5 h-5" />,
    },
    {
      index: "02",
      title: p.fact2_t,
      description: p.fact2_d,
      icon: <MotorIcon className="w-5 h-5" />,
    },
    {
      index: "03",
      title: p.fact3_t,
      description: p.fact3_d,
      icon: <ShieldIcon className="w-5 h-5" />,
    },
  ];

  const whatsappText =
    language === "de"
      ? "Guten Tag, ich möchte ein Preisangebot für meine Glassysteme anfordern."
      : language === "en"
      ? "Hello, I would like to request a quotation for my project dimensions."
      : "Merhaba, projem için fiyat teklifi almak istiyorum.";

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold tracking-wide text-slate-200 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>{t.nav.fiyatlandirma}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              {p.hero_title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              {p.hero_desc}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/iletisim"
                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <span>{t.nav.get_quote}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsAppUrl(whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="btn-press inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Price Factors */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>{p.factors_title}</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              {t.shared.price_why_title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {t.shared.price_why_note}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {factors.map((f) => (
              <div
                key={f.index}
                className="p-7 bg-white rounded-2xl border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                    {f.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {f.index}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Architectural Configurator */}
      <BalconyCalculator />

      <CTABlock />
    </>
  );
}
