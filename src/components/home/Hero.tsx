"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { getWhatsAppUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import {
  WhatsAppIcon,
  ArrowRightIcon,
  CheckIcon,
  RulerIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function Hero() {
  const { t, language } = useLanguage();

  const whatsappText =
    language === "de"
      ? "Guten Tag, ich möchte ein Angebot für Guillotine-Glas / Balkonverglasung anfordern."
      : language === "en"
      ? "Hello, I would like to request a quote for Guillotine Glass / Glass Balcony systems."
      : "Merhaba, giyotin cam ve cam balkon sistemleri için fiyat teklifi almak istiyorum.";

  const metrics = [
    { value: "20+", label: t.hero.stat_years },
    { value: "10.000+", label: t.hero.stat_projects },
    { value: "%100", label: t.hero.stat_satisfaction },
    { value: t.hero.stat_warranty_val, label: t.hero.stat_warranty },
  ];

  return (
    <section className="relative bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
      {/* Background Video & Architectural Overlays */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          poster="/hero-balcony.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-[#0b0f19]/55" />
        <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="container relative z-10 pt-16 pb-14 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
        <div className="max-w-3xl">
          {/* Technical Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold tracking-wide text-slate-200 mb-7 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Display Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.12] tracking-tight mb-6 animate-fade-in-delay-1">
            <span className="block text-slate-300 font-medium text-2xl sm:text-3xl md:text-4xl mb-2">
              {t.hero.title_prefix}
            </span>
            <span className="text-white">{t.hero.title_highlight}</span>{" "}
            <span className="text-red-500">{t.hero.title_suffix}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-9 leading-relaxed animate-fade-in-delay-2">
            {t.hero.subtitle}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 animate-fade-in-delay-3">
            <Link
              href="/iletisim"
              className="btn-press inline-flex items-center justify-center gap-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-4 rounded-xl font-semibold text-base transition-colors shadow-lg shadow-red-950/40"
            >
              <span>{t.hero.cta_quote}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <a
              href={getWhatsAppUrl(whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="btn-press inline-flex items-center justify-center gap-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white px-7 py-4 rounded-xl font-semibold text-base transition-colors shadow-lg shadow-emerald-950/30"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{t.hero.cta_whatsapp}</span>
            </a>

            <a
              href="#hesaplayici"
              className="btn-press inline-flex items-center justify-center gap-2 bg-white/[0.07] hover:bg-white/[0.13] text-slate-100 border border-white/15 px-5 py-4 rounded-xl font-medium text-sm transition-colors"
            >
              <RulerIcon className="w-4 h-4 text-slate-300" />
              <span>{t.calculator.badge}</span>
            </a>
          </div>

          {/* Engineering Assurances */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mt-10 text-xs sm:text-sm text-slate-300">
            <div className="inline-flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-red-500" />
              <span>{t.nav.free_discovery}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-red-500" />
              <span>{t.common.factory_direct}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-red-500" />
              <span>{t.hero.stat_warranty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Docked Architectural Specification Metrics Strip */}
      <div className="relative z-10 border-t border-white/10 bg-slate-950/75 backdrop-blur-md">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x divide-white/10">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="py-5 px-4 first:pl-0 lg:px-6 flex flex-col justify-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
