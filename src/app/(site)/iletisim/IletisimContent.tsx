"use client";

import ContactForm from "@/components/home/ContactForm";
import { useLanguage } from "@/lib/i18n";
import { SITE_CONTACT, getWhatsAppUrl } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function IletisimContent() {
  const { t, language } = useLanguage();
  const p = t.pages.iletisim;

  const whatsappText =
    language === "de"
      ? "Guten Tag, ich interessiere mich für Ihre Produkte und möchte ein Angebot anfordern."
      : language === "en"
      ? "Hello, I would like to inquire about your products and request a quote."
      : "Merhaba, ürünleriniz hakkında bilgi ve fiyat teklifi almak istiyorum.";

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold tracking-wide text-slate-200 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>{t.contact.title}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {p.hero_title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {p.hero_desc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="mb-6 pb-5 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-1.5">
                  {p.form_title}
                </h2>
                <p className="text-slate-600 text-sm">{p.form_desc}</p>
              </div>
              <ContactForm />
            </div>

            {/* Right: Official Address, Direct Channels & Live Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
                <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                  {t.footer.contact_info}
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <MapPinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-0.5">{p.addr_title}</div>
                      <a
                        href={SITE_CONTACT.mapDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-[var(--primary)] transition-colors leading-relaxed"
                      >
                        {p.addr_val}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-0.5">{p.phone_title}</div>
                      <a
                        href={`tel:${SITE_CONTACT.phoneRaw}`}
                        onClick={trackPhoneClick}
                        className="text-slate-700 font-semibold hover:text-[var(--primary)] transition-colors"
                      >
                        {SITE_CONTACT.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <MailIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 mb-0.5">
                        {t.contact.email_label}
                      </div>
                      <a
                        href={`mailto:${SITE_CONTACT.email}`}
                        className="text-slate-600 hover:text-[var(--primary)] transition-colors break-all"
                      >
                        {SITE_CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-0.5">{p.hours_title}</div>
                      <div className="text-slate-600">{p.hours_val}</div>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl(whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="btn-press flex items-center justify-center gap-2.5 w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>{t.shared.cta_whatsapp}</span>
                </a>
              </div>

              {/* Live Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden h-72 border border-slate-200 bg-slate-100">
                <iframe
                  src={SITE_CONTACT.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ata Yapı Fabrika & Atölye Konumu"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
