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
  SunWindIcon,
  MotorIcon,
  ShieldIcon,
  WrenchIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function TenteContent() {
  const { t, language } = useLanguage();
  const p = t.pages.tente;

  const whatsappText =
    language === "de"
      ? "Guten Tag, ich interessiere mich für Kassetten- und Gelenkarmmarkisen."
      : language === "en"
      ? "Hello, I am inquiring about cassette and motorized awning systems."
      : "Merhaba, tente sistemleri hakkında bilgi almak istiyorum.";

  const types = [
    {
      index: "01",
      title: p.s1_t,
      description: p.s1_d,
      href: "/tente/kasetli",
      image: "/kasetli-tente.png",
      icon: <ShieldIcon className="w-5 h-5" />,
    },
    {
      index: "02",
      title: p.s2_t,
      description: p.s2_d,
      href: "/tente/mafsalli",
      image: "/mafsalli-tente.png",
      icon: <SunWindIcon className="w-5 h-5" />,
    },
    {
      index: "03",
      title: p.s3_t,
      description: p.s3_d,
      href: "/tente/motorlu",
      image: "/tente-service.png",
      icon: <MotorIcon className="w-5 h-5" />,
    },
  ];

  const features = [
    { index: "01", title: p.f1_t, description: p.f1_d, icon: <ShieldIcon className="w-5 h-5" /> },
    { index: "02", title: p.f2_t, description: p.f2_d, icon: <WrenchIcon className="w-5 h-5" /> },
    { index: "03", title: p.f3_t, description: p.f3_d, icon: <SunWindIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/tente-service.png"
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

      {/* Awning Systems */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {types.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col overflow-hidden bg-white rounded-2xl border border-slate-200 hover:border-slate-900 transition-all card-hover"
              >
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-slate-950/80 text-white font-mono text-xs font-semibold border border-white/15">
                    {item.index}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                        {item.icon}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-[var(--primary)] transition-colors">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-900 group-hover:text-[var(--primary)]">
                    <span>{t.services.explore_button}</span>
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div
                key={feat.index}
                className="p-7 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-transparent flex items-center justify-center transition-colors">
                    {feat.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {feat.index}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.description}</p>
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
