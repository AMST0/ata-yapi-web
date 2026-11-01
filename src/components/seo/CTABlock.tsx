"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { SITE_CONTACT, getWhatsAppUrl } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import { WhatsAppIcon, PhoneIcon, ArrowRightIcon } from "@/components/icons/ArchitecturalIcons";

interface CTABlockProps {
  title?: string;
  description?: string;
}

export default function CTABlock({ title, description }: CTABlockProps) {
  const { t, language } = useLanguage();
  const displayTitle = title || t.shared.cta_title;
  const displayDesc = description || t.shared.cta_desc;

  const whatsappText =
    language === "de"
      ? "Guten Tag, ich interessiere mich für Ihre Glassysteme und möchte ein Angebot anfordern."
      : language === "en"
      ? "Hello, I would like to request a quotation for your glass systems."
      : "Merhaba, ücretsiz keşif ve fiyat teklifi almak istiyorum.";

  return (
    <section className="py-16 lg:py-24 bg-[#0b0f19] text-white relative overflow-hidden border-t border-slate-800">
      <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10 lg:p-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
            <span className="w-5 h-[2px] bg-red-500" />
            <span>{t.common.factory_direct}</span>
            <span className="w-5 h-[2px] bg-red-500" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {displayTitle}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {displayDesc}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3.5">
            <a
              href={getWhatsAppUrl(whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="btn-press inline-flex items-center justify-center gap-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{t.shared.cta_whatsapp}</span>
            </a>

            <a
              href={`tel:${SITE_CONTACT.phoneRaw}`}
              onClick={trackPhoneClick}
              className="btn-press inline-flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base border border-slate-700 transition-colors"
            >
              <PhoneIcon className="w-4 h-4 text-red-400" />
              <span>{SITE_CONTACT.phoneDisplay}</span>
            </a>

            <Link
              href="/iletisim"
              className="btn-press inline-flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
            >
              <span>{t.shared.cta_form}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
