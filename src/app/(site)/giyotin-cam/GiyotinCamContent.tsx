"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { getWhatsAppUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import FreeInspection from "@/components/seo/FreeInspection";
import WarrantyProcess from "@/components/seo/WarrantyProcess";
import CTABlock from "@/components/seo/CTABlock";
import {
  MotorIcon,
  BuildingIcon,
  FactoryIcon,
  LayersIcon,
  ShieldIcon,
  SunWindIcon,
  SparkGridIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function GiyotinCamContent() {
  const { t, language } = useLanguage();
  const p = t.pages.giyotin;

  const whatsappText =
    language === "de"
      ? "Guten Tag, ich interessiere mich für motorisierte Guillotine-Glassysteme."
      : language === "en"
      ? "Hello, I am inquiring about motorized guillotine glass systems."
      : "Merhaba, giyotin cam sistemi hakkında bilgi almak istiyorum.";

  const subCategories = [
    {
      index: "01",
      title: p.sub1_t,
      description: p.sub1_d,
      href: "/giyotin-cam/motorlu",
      badge: language === "de" ? "Automation" : language === "en" ? "Automation" : "Otomasyon",
      icon: <MotorIcon className="w-5 h-5" />,
    },
    {
      index: "02",
      title: p.sub2_t,
      description: p.sub2_d,
      href: "/giyotin-cam/uygulamalar",
      badge:
        language === "de"
          ? "Gewerbe & Wohnbau"
          : language === "en"
          ? "Commercial & Home"
          : "Ticari & Konut",
      icon: <BuildingIcon className="w-5 h-5" />,
    },
    {
      index: "03",
      title: p.sub3_t,
      description: p.sub3_d,
      href: "/giyotin-cam/imalat",
      badge: t.common.factory_direct,
      icon: <FactoryIcon className="w-5 h-5" />,
    },
  ];

  const features = [
    { index: "01", title: p.f1_t, description: p.f1_d, icon: <MotorIcon className="w-5 h-5" /> },
    { index: "02", title: p.f2_t, description: p.f2_d, icon: <LayersIcon className="w-5 h-5" /> },
    { index: "03", title: p.f3_t, description: p.f3_d, icon: <ShieldIcon className="w-5 h-5" /> },
    { index: "04", title: p.f4_t, description: p.f4_d, icon: <SparkGridIcon className="w-5 h-5" /> },
  ];

  const usageAreas = [
    { index: "01", title: p.a1_t, description: p.a1_d, icon: <BuildingIcon className="w-5 h-5" /> },
    { index: "02", title: p.a2_t, description: p.a2_d, icon: <SunWindIcon className="w-5 h-5" /> },
    { index: "03", title: p.a3_t, description: p.a3_d, icon: <LayersIcon className="w-5 h-5" /> },
    { index: "04", title: p.a4_t, description: p.a4_d, icon: <SparkGridIcon className="w-5 h-5" /> },
  ];

  const gallery = [
    { src: "/giyotin-cam-hero.jpg", alt: "Ata Yapı Motorlu Giyotin Cam" },
    { src: "/giyotin-cam-service.jpg", alt: "Giyotin Cam Restoran Uygulaması" },
    { src: "/giyotin-cam-detail.jpg", alt: "Alüminyum Profil & Zincir Detayı" },
    { src: "/giyotin-cam-terrace.png", alt: "Teras Giyotin Cam Kapatma" },
  ];

  return (
    <>
      {/* Architectural Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/giyotin-cam-hero.jpg"
            alt={p.hero_title}
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-[#0b0f19]/40" />
          <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    {t.common.back}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-semibold">{p.hero_title}</li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold tracking-wide text-slate-200 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>{p.hero_badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
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
                <span>{t.nav.free_discovery}</span>
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

      {/* Sub Categories */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {subCategories.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="group flex flex-col justify-between bg-white p-7 rounded-2xl border border-slate-200 hover:border-slate-900 transition-all card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                      {sub.icon}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                      {sub.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {sub.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    {sub.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-900 group-hover:text-[var(--primary)]">
                  <span>{t.services.explore_button}</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>SPECIFICATIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {p.feat_title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat) => (
              <div
                key={feat.index}
                className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-transparent flex items-center justify-center transition-colors">
                    {feat.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {feat.index}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Areas */}
      <section className="py-16 lg:py-24 bg-[#0b0f19] text-white border-b border-slate-800">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
              <span className="w-6 h-[2px] bg-red-500" />
              <span>APPLICATIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{p.areas_title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {usageAreas.map((area) => (
              <div
                key={area.index}
                className="p-6 bg-slate-900/80 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-red-400 flex items-center justify-center">
                    {area.icon}
                  </div>
                  <span className="text-xs font-mono text-slate-500">{area.index}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{area.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Application Gallery */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FreeInspection />
      <WarrantyProcess />
      <CTABlock />
    </>
  );
}
