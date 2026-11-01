"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { getWhatsAppUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import { WhatsAppIcon, ArrowUpRightIcon } from "@/components/icons/ArchitecturalIcons";

export default function FloatingCTA() {
  const { t, language } = useLanguage();
  const whatsappText =
    language === "de"
      ? "Guten Tag, ich möchte ein Angebot für Ihre Glassysteme anfordern."
      : language === "en"
      ? "Hello, I would like to request a quote for your glass systems."
      : "Merhaba, giyotin cam ve cam balkon sistemleri için fiyat teklifi almak istiyorum.";

  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-2 p-1.5 rounded-full bg-[#0b0f19]/95 backdrop-blur-md border border-slate-800 shadow-2xl shadow-slate-950/30">
      <a
        href={getWhatsAppUrl(whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppClick}
        className="btn-press inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2.5 rounded-full font-semibold text-xs transition-colors"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
      <Link
        href="/iletisim"
        className="btn-press inline-flex items-center gap-1.5 bg-transparent hover:bg-slate-800 text-white px-4 py-2.5 rounded-full font-semibold text-xs transition-colors"
      >
        <span>{t.nav.free_discovery}</span>
        <ArrowUpRightIcon className="w-3.5 h-3.5 text-red-400" />
      </Link>
    </div>
  );
}
