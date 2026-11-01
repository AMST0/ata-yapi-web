"use client";

import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { SITE_CONTACT, getWhatsAppUrl } from "@/lib/constants";
import ContactForm from "@/components/home/ContactForm";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  WhatsAppIcon,
  MailIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function Contact() {
  const { t, language } = useLanguage();
  const whatsappText =
    language === "de"
      ? "Guten Tag, ich interessiere mich für Ihre Glassysteme."
      : language === "en"
      ? "Hello, I would like to inquire about your glass systems."
      : "Merhaba, ücretsiz keşif ve fiyat teklifi için bilgi almak istiyorum.";

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Official Factory Details & Live Google Map */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
                <span className="w-6 h-[2px] bg-[var(--primary)]" />
                <span>{t.contact.title}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                {t.pages.iletisim.hero_title}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-0.5">
                      {t.contact.phone_label}
                    </div>
                    <a
                      href={`tel:${SITE_CONTACT.phoneRaw}`}
                      onClick={trackPhoneClick}
                      className="font-bold text-slate-900 hover:text-[var(--primary)] text-sm transition-colors"
                    >
                      {SITE_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-500 mb-0.5">
                      {t.contact.email_label}
                    </div>
                    <a
                      href={`mailto:${SITE_CONTACT.email}`}
                      className="font-bold text-slate-900 hover:text-[var(--primary)] text-xs sm:text-sm transition-colors break-all"
                    >
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-0.5">
                      {t.contact.location_label}
                    </div>
                    <a
                      href={SITE_CONTACT.mapDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-900 hover:text-[var(--primary)] text-xs leading-snug block transition-colors"
                    >
                      {t.pages.iletisim.addr_val}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <ClockIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-0.5">
                      {t.pages.iletisim.hours_title}
                    </div>
                    <div className="font-semibold text-slate-900 text-xs leading-snug">
                      {t.pages.iletisim.hours_val}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Banner + Map */}
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  src={SITE_CONTACT.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ata Yapı Fabrika Konum"
                />
              </div>

              <a
                href={getWhatsAppUrl(whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="btn-press flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>{t.common.whatsapp_chat}</span>
              </a>
            </div>
          </div>

          {/* Right: Direct Quote & Project Request Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-900/5 p-6 sm:p-8 lg:p-10">
              <div className="mb-6 pb-5 border-b border-slate-100">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                  {t.pages.iletisim.form_title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t.pages.iletisim.form_desc}
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
