"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { SITE_CONTACT, getWhatsAppUrl } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons/ArchitecturalIcons";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = t.faq.items;

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Engineering Support Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {t.faq.title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-7">
              {t.faq.subtitle}
            </p>

            <div className="p-6 rounded-2xl bg-[#0b0f19] text-white border border-slate-800 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-red-400">
                {t.common.factory_direct}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.shared.cta_desc}
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-xs transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{t.common.whatsapp_chat}</span>
                </a>
                <a
                  href={`tel:${SITE_CONTACT.phoneRaw}`}
                  onClick={trackPhoneClick}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs border border-slate-700 transition-colors"
                >
                  <PhoneIcon className="w-4 h-4 text-red-400" />
                  <span>{SITE_CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Numbered Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-colors overflow-hidden bg-white ${
                    isOpen ? "border-slate-900 shadow-sm" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`text-xs font-mono font-bold mt-0.5 px-2 py-0.5 rounded ${
                          isOpen
                            ? "bg-[var(--primary)] text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-semibold text-slate-900 text-sm sm:text-base">
                        {item.question}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-slate-900" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pl-14 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
