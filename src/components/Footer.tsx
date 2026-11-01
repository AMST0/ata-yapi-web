"use client";

import Link from "next/link";
import Image from "next/image";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import LanguageSelector from "@/components/LanguageSelector";
import { SITE_CONTACT, getWhatsAppUrl } from "@/lib/constants";
import {
  WhatsAppIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  MailIcon,
  InstagramIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function Footer() {
  const { t } = useLanguage();

  const productLinks = [
    { href: "/giyotin-cam", label: t.nav.giyotin_cam },
    { href: "/giyotin-cam/motorlu", label: t.nav.motorlu_giyotin },
    { href: "/cam-balkon", label: t.nav.cam_balkon },
    { href: "/cam-balkon/isi-camli", label: t.nav.cam_balkon_isicamli },
    { href: "/sineklik", label: t.nav.sineklik },
    { href: "/sineklik/kedi-sineklik", label: "Kedi Sinekliği" },
    { href: "/tente", label: t.nav.tente },
    { href: "/pimapen-tamir", label: t.nav.pimapen_tamir },
  ];

  const quickLinks = [
    { href: "/bayi-kurumsal", label: t.nav.bayi_kurumsal },
    { href: "/fiyatlandirma", label: t.nav.fiyatlandirma },
    { href: "/giyotin-cam/uygulamalar", label: t.nav.uygulamalar },
    { href: "/hizmet-bolgeleri", label: "Hizmet Bölgeleri & Katalog" },
    { href: "/iletisim", label: t.nav.iletisim },
  ];

  const regionLinks = [
    { href: "/bolge/maltepe-giyotin-cam", label: "Maltepe Giyotin Cam" },
    { href: "/bolge/maltepe-cam-balkon", label: "Maltepe Cam Balkon" },
    { href: "/bolge/kadikoy-giyotin-cam", label: "Kadıköy Giyotin Cam" },
    { href: "/bolge/atasehir-giyotin-cam", label: "Ataşehir Giyotin Cam" },
    { href: "/bolge/balikesir-giyotin-cam", label: "Balıkesir / Edremit" },
    { href: "/bolge/izmir-giyotin-cam", label: "İzmir & Çanakkale" },
    { href: "/hizmet-bolgeleri", label: "Tüm Bölgeler (24+) →" },
  ];

  return (
    <footer className="bg-[#0b0f19] text-slate-300 border-t border-slate-800/80 pt-16 pb-24 lg:pb-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Manufacturing Identity */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Ata Yapı Logo"
                width={150}
                height={56}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t.footer.about_desc}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${SITE_CONTACT.phoneRaw}`}
                onClick={trackPhoneClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold border border-slate-700 transition-colors"
                aria-label={t.common.call_now}
              >
                <PhoneIcon className="w-4 h-4" />
                {SITE_CONTACT.phoneDisplay}
              </a>
              <a
                href={SITE_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-xs font-semibold transition-opacity"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Product Lines */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-5">
              {t.footer.products}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Regions */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-5">
              {t.footer.quick_links}
            </h3>
            <ul className="space-y-2.5 text-sm mb-7">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-3">
              {t.footer.regions}
            </h3>
            <ul className="space-y-2 text-xs">
              {regionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Factory Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-5">
              {t.footer.contact_info}
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-4 h-4 mt-1 shrink-0 text-red-500" />
                <a
                  href={SITE_CONTACT.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  {t.pages.iletisim.addr_val}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 shrink-0 text-red-500" />
                <a
                  href={`tel:${SITE_CONTACT.phoneRaw}`}
                  onClick={trackPhoneClick}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-4 h-4 shrink-0 text-red-500" />
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                <span>{t.pages.iletisim.hours_val}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Upward-Opening Language Selector */}
        <div className="mt-14 pt-8 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()} {SITE_CONTACT.fullCompanyName}. {t.footer.rights_reserved}
          </p>
          <div className="flex items-center gap-2.5">
            <span className="text-slate-400">{t.common.language}:</span>
            <LanguageSelector variant="desktop" direction="up" theme="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
