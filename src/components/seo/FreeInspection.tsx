"use client";

import { useLanguage } from "@/lib/i18n";

export default function FreeInspection() {
  const { t } = useLanguage();

  const steps = [
    { step: "01", title: t.shared.step1_t, description: t.shared.step1_d },
    { step: "02", title: t.shared.step2_t, description: t.shared.step2_d },
    { step: "03", title: t.shared.step3_t, description: t.shared.step3_d },
    { step: "04", title: t.shared.step4_t, description: t.shared.step4_d },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
            <span className="w-6 h-[2px] bg-[var(--primary)]" />
            <span>01 — 04</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            {t.shared.free_insp_title}
          </h2>
          <p className="text-slate-600 text-base">{t.shared.free_insp_desc}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-900 transition-colors"
            >
              <div className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-xs font-bold mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
