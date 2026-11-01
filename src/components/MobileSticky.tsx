"use client";

import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { SITE_CONTACT, getWhatsAppUrl } from "@/lib/constants";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons/ArchitecturalIcons";

export default function MobileSticky() {
  const { t, language } = useLanguage();
  const whatsappText =
    language === "de"
      ? "Guten Tag, ich interessiere mich für Ihre Glassysteme."
      : language === "en"
      ? "Hello, I would like to inquire about your glass systems."
      : "Merhaba, cam balkon ve giyotin cam sistemleri hakkında bilgi almak istiyorum.";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0b0f19]/95 backdrop-blur-md border-t border-slate-800 pb-[env(safe-area-inset-bottom)] shadow-2xl">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${SITE_CONTACT.phoneRaw}`}
          onClick={trackPhoneClick}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 btn-press"
        >
          <PhoneIcon className="w-4 h-4 text-red-400" />
          <span>{t.common.call_now}</span>
        </a>

        <a
          href={getWhatsAppUrl(whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm btn-press"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
