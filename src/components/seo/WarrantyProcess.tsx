"use client";

import { useLanguage } from "@/lib/i18n";
import { ShieldIcon, BuildingIcon, CheckIcon } from "@/components/icons/ArchitecturalIcons";

export default function WarrantyProcess() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-[#0b0f19] text-white border-b border-slate-800">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
              <span className="w-6 h-[2px] bg-red-500" />
              <span>CE / ISO</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              {t.shared.warranty_title}
            </h2>
            <p className="text-slate-400 text-base">{t.shared.warranty_desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Warranty Scope */}
            <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 bg-red-500/15 text-red-400 rounded-xl flex items-center justify-center border border-red-500/20">
                  <ShieldIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {t.shared.w_scope_title}
                </h3>
              </div>
              <ul className="space-y-3 text-slate-300 text-sm">
                {[t.shared.w1, t.shared.w2, t.shared.w3, t.shared.w4].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Installation & Export Standards */}
            <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 bg-emerald-500/15 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <BuildingIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {t.shared.w_install_title}
                </h3>
              </div>
              <ul className="space-y-3 text-slate-300 text-sm">
                {[t.shared.i1, t.shared.i2, t.shared.i3, t.shared.i4].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
