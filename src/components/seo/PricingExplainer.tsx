"use client";

import { useLanguage } from "@/lib/i18n";
import { RulerIcon } from "@/components/icons/ArchitecturalIcons";

interface PricingExplainerProps {
  customNote?: string;
}

export default function PricingExplainer({ customNote }: PricingExplainerProps) {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-slate-100/80 border-y border-slate-200">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-slate-900 text-white rounded-xl">
              <RulerIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5">
                {t.shared.price_why_title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {customNote || t.shared.price_why_note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
