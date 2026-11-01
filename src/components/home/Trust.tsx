"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import {
  FactoryIcon,
  ShieldIcon,
  BoxCrateIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function Trust() {
  const { t } = useLanguage();

  const pillars = [
    {
      index: "01",
      title: t.trust.item1_title,
      description: t.trust.item1_desc,
      icon: <FactoryIcon className="w-5 h-5" />,
    },
    {
      index: "02",
      title: t.trust.item2_title,
      description: t.trust.item2_desc,
      icon: <CheckIcon className="w-5 h-5" />,
    },
    {
      index: "03",
      title: t.trust.item3_title,
      description: t.trust.item3_desc,
      icon: <BoxCrateIcon className="w-5 h-5" />,
    },
    {
      index: "04",
      title: t.trust.item4_title,
      description: t.trust.item4_desc,
      icon: <ShieldIcon className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left: Real Ata Yapı Architectural Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <Image
                src="/giyotin-cam-terrace.png"
                alt={t.trust.title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/90 via-[#0b0f19]/20 to-transparent" />

              {/* Bottom Engineering Stamp Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#0b0f19]/90 backdrop-blur-md border border-white/15 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-red-400 mb-0.5">
                      {t.common.factory_direct}
                    </div>
                    <div className="font-semibold text-sm sm:text-base text-white">
                      {t.trust.item2_title}
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-right shrink-0">
                    <div className="text-lg font-bold leading-none text-white">
                      {t.hero.stat_warranty_val}
                    </div>
                    <div className="text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">
                      CE / ISO
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Hardware Detail Thumbnail (Desktop) */}
            <div className="hidden sm:block absolute -top-5 -right-5 w-36 h-36 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-slate-900">
              <Image
                src="/giyotin-cam-detail.jpg"
                alt="Ata Yapı Alüminyum Profil Detayı"
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: 4 Architectural Engineering Pillars */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>{t.trust.badge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-slate-900 mb-4 leading-tight">
              {t.trust.title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              {t.trust.subtitle}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.index}
                  className="p-5 bg-white rounded-xl border border-slate-200/90 hover:border-slate-900 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                      {pillar.icon}
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      {pillar.index}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/giyotin-cam/imalat"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-[var(--primary)] transition-colors"
              >
                <span>{t.nav.imalat_montaj}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/bayi-kurumsal"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-[var(--primary)] transition-colors"
              >
                <span>{t.nav.bayi_kurumsal}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
