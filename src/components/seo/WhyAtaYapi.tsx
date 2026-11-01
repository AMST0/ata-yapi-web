"use client";

import { useLanguage } from "@/lib/i18n";
import {
  FactoryIcon,
  ShieldIcon,
  RulerIcon,
  WrenchIcon,
  BuildingIcon,
  BoxCrateIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function WhyAtaYapi() {
  const { t } = useLanguage();

  const reasons = [
    {
      index: "01",
      icon: <FactoryIcon className="w-5 h-5" />,
      title: t.shared.r1_t,
      description: t.shared.r1_d,
    },
    {
      index: "02",
      icon: <ShieldIcon className="w-5 h-5" />,
      title: t.shared.r2_t,
      description: t.shared.r2_d,
    },
    {
      index: "03",
      icon: <RulerIcon className="w-5 h-5" />,
      title: t.shared.r3_t,
      description: t.shared.r3_d,
    },
    {
      index: "04",
      icon: <WrenchIcon className="w-5 h-5" />,
      title: t.shared.r4_t,
      description: t.shared.r4_d,
    },
    {
      index: "05",
      icon: <BuildingIcon className="w-5 h-5" />,
      title: t.shared.r5_t,
      description: t.shared.r5_d,
    },
    {
      index: "06",
      icon: <BoxCrateIcon className="w-5 h-5" />,
      title: t.shared.r6_t,
      description: t.shared.r6_d,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
            <span className="w-6 h-[2px] bg-[var(--primary)]" />
            <span>{t.common.factory_direct}</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            {t.shared.why_title}
          </h2>
          <p className="text-slate-600 text-base">{t.shared.why_subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason) => (
            <div
              key={reason.index}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-900 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                  {reason.icon}
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  {reason.index}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                {reason.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
