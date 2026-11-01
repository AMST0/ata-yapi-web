"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { SITE_CONTACT, getWhatsAppUrl } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import ContactForm from "@/components/home/ContactForm";
import {
  GlobeIcon,
  BoxCrateIcon,
  BuildingIcon,
  FactoryIcon,
  ShieldIcon,
  RulerIcon,
  WrenchIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function BayiKurumsalContent() {
  const { t, language } = useLanguage();
  const p = t.pages.bayi;

  const whatsappText =
    language === "de"
      ? "Guten Tag, ich interessiere mich für eine B2B-Händlerpartnerschaft und Großhandelsangebote."
      : language === "en"
      ? "Hello, I am interested in B2B wholesale supply and dealership opportunities."
      : "Merhaba, bayilik ve toptan ihracat tedariki hakkında bilgi almak istiyorum.";

  const partnershipModels = [
    {
      index: "01",
      title: p.m1_t,
      description: p.m1_d,
      icon: <GlobeIcon className="w-5 h-5" />,
      badge:
        language === "de"
          ? "Exklusivität"
          : language === "en"
          ? "Exclusivity"
          : "Bölgesel Yetki",
    },
    {
      index: "02",
      title: p.m2_t,
      description: p.m2_d,
      icon: <BoxCrateIcon className="w-5 h-5" />,
      badge:
        language === "de"
          ? "Großhandelsrabatte"
          : language === "en"
          ? "Wholesale Rates"
          : "Toptan İskonto",
    },
    {
      index: "03",
      title: p.m3_t,
      description: p.m3_d,
      icon: <BuildingIcon className="w-5 h-5" />,
      badge:
        language === "de"
          ? "Objektbau"
          : language === "en"
          ? "Commercial Projects"
          : "Proje Bazlı",
    },
    {
      index: "04",
      title: p.m4_t,
      description: p.m4_d,
      icon: <FactoryIcon className="w-5 h-5" />,
      badge:
        language === "de"
          ? "Maßanfertigung"
          : language === "en"
          ? "Custom OEM"
          : "Özel İmalat",
    },
  ];

  const advantages = [
    { index: "01", title: p.adv1_t, description: p.adv1_d, icon: <FactoryIcon className="w-5 h-5" /> },
    { index: "02", title: p.adv2_t, description: p.adv2_d, icon: <RulerIcon className="w-5 h-5" /> },
    { index: "03", title: p.adv3_t, description: p.adv3_d, icon: <BoxCrateIcon className="w-5 h-5" /> },
    { index: "04", title: p.adv4_t, description: p.adv4_d, icon: <GlobeIcon className="w-5 h-5" /> },
    { index: "05", title: p.adv5_t, description: p.adv5_d, icon: <ShieldIcon className="w-5 h-5" /> },
    { index: "06", title: p.adv6_t, description: p.adv6_d, icon: <WrenchIcon className="w-5 h-5" /> },
  ];

  const processSteps = [
    { step: "01", title: p.p1_t, description: p.p1_d },
    { step: "02", title: p.p2_t, description: p.p2_d },
    { step: "03", title: p.p3_t, description: p.p3_d },
    { step: "04", title: p.p4_t, description: p.p4_d },
  ];

  return (
    <>
      {/* Architectural B2B Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/giyotin-cam-hero.jpg"
            alt={p.hero_title}
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/92 to-[#0b0f19]/60" />
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
              <a
                href="#basvuru"
                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <span>{p.form_submit}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl(whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="btn-press inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp B2B</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>B2B & EXPORT</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {p.models_title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {partnershipModels.map((model) => (
              <div
                key={model.index}
                className="group p-7 sm:p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-900 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                    {model.icon}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 bg-slate-100 text-slate-700 rounded-md">
                    {model.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{model.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Advantages */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>MANUFACTURING ADVANTAGES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {p.adv_title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((item) => (
              <div
                key={item.index}
                className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-transparent flex items-center justify-center transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {item.index}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export & Order Workflow */}
      <section className="py-16 lg:py-24 bg-[#0b0f19] text-white border-b border-slate-800">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
              <span className="w-6 h-[2px] bg-red-500" />
              <span>01 — 04</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{p.proc_title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="bg-slate-900/80 rounded-xl p-6 border border-slate-800"
              >
                <span className="inline-block px-2.5 py-1 rounded bg-red-600 text-white font-mono text-xs font-bold mb-4">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct B2B Application & Export Desk */}
      <section className="py-16 lg:py-24 bg-slate-50" id="basvuru">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
                  <span className="w-6 h-[2px] bg-[var(--primary)]" />
                  <span>{t.b2b.badge}</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">{p.form_title}</h2>
                <p className="text-slate-600 text-base leading-relaxed">{p.form_desc}</p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppUrl(whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="btn-press flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>WhatsApp B2B ({SITE_CONTACT.phoneDisplay})</span>
                </a>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <PhoneIcon className="w-4 h-4 text-[var(--primary)]" />
                    <a
                      href={`tel:${SITE_CONTACT.phoneRaw}`}
                      onClick={trackPhoneClick}
                      className="font-semibold hover:text-[var(--primary)]"
                    >
                      {SITE_CONTACT.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <MailIcon className="w-4 h-4 text-[var(--primary)]" />
                    <a
                      href={`mailto:${SITE_CONTACT.email}`}
                      className="font-semibold hover:text-[var(--primary)] break-all"
                    >
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
