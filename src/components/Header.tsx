"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import LanguageSelector from "@/components/LanguageSelector";
import { SITE_CONTACT, getWhatsAppUrl } from "@/lib/constants";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";
import { PhoneIcon, WhatsAppIcon, FactoryIcon, ClockIcon } from "@/components/icons/ArchitecturalIcons";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    {
      href: "/giyotin-cam",
      label: t.nav.giyotin_systems,
      matchPrefix: "/giyotin-cam",
      children: [
        { href: "/giyotin-cam", label: t.nav.giyotin_cam },
        { href: "/giyotin-cam/motorlu", label: t.nav.motorlu_giyotin },
        { href: "/giyotin-cam/uygulamalar", label: t.nav.uygulamalar },
        { href: "/giyotin-cam/imalat", label: t.nav.imalat_montaj },
      ],
    },
    {
      href: "/cam-balkon",
      label: t.nav.cam_balkon,
      matchPrefix: "/cam-balkon",
      children: [
        { href: "/cam-balkon", label: t.nav.cam_balkon },
        { href: "/cam-balkon/katlanir", label: t.nav.cam_balkon_katlanir },
        { href: "/cam-balkon/surme", label: t.nav.cam_balkon_surme },
        { href: "/cam-balkon/isi-camli", label: t.nav.cam_balkon_isicamli },
      ],
    },
    {
      href: "/sineklik",
      label: t.nav.diger_hizmetler,
      matchPrefix: "/diger",
      children: [
        { href: "/sineklik", label: t.nav.sineklik },
        { href: "/tente", label: t.nav.tente },
        { href: "/pimapen-tamir", label: t.nav.pimapen_tamir },
      ],
    },
    { href: "/bayi-kurumsal", label: t.nav.bayi_kurumsal, matchPrefix: "/bayi-kurumsal" },
    { href: "/fiyatlandirma", label: t.nav.fiyatlandirma, matchPrefix: "/fiyatlandirma" },
    { href: "/iletisim", label: t.nav.iletisim, matchPrefix: "/iletisim" },
  ];

  const isLinkActive = (link: (typeof navLinks)[number]) => {
    if (link.children) {
      return link.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));
    }
    return pathname === link.href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      {/* Architectural Top Utility Strip (Desktop) */}
      <div className="hidden lg:block bg-[#0b0f19] text-slate-300 border-b border-white/10 text-xs">
        <div className="container flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 font-medium text-slate-200">
              <FactoryIcon className="w-3.5 h-3.5 text-red-500" />
              {t.common.factory_direct} • TR / EU
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <ClockIcon className="w-3.5 h-3.5 text-slate-500" />
              {t.pages.iletisim.hours_val}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${SITE_CONTACT.phoneRaw}`}
              onClick={trackPhoneClick}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-medium transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-red-500" />
              {SITE_CONTACT.phoneDisplay}
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Main Navigation">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => {
              setIsMenuOpen(false);
              setOpenDropdown(null);
            }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Ata Yapı"
              width={160}
              height={50}
              className="h-10 md:h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <li
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {link.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.label ? null : link.label)
                        }
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          active
                            ? "text-[var(--primary)] font-semibold"
                            : "text-slate-700 hover:text-slate-950"
                        }`}
                        aria-expanded={openDropdown === link.label}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <svg
                          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                            openDropdown === link.label ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      <div
                        className={`absolute top-full left-0 pt-2 transition-all duration-150 ${
                          openDropdown === link.label
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-1.5 pointer-events-none"
                        }`}
                      >
                        <div className="bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200/90 py-2 min-w-[230px]">
                          {link.children.map((child) => {
                            const childActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors border-l-2 ${
                                  childActive
                                    ? "border-[var(--primary)] bg-slate-50 text-[var(--primary)] font-semibold"
                                    : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-950 hover:border-slate-300"
                                }`}
                              >
                                <span>{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`link-hover text-sm font-medium transition-colors ${
                        active
                          ? "text-[var(--primary)] font-semibold"
                          : "text-slate-700 hover:text-slate-950"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSelector variant="desktop" />
            <Link
              href="/iletisim"
              className="btn-press inline-flex items-center gap-2 bg-slate-900 hover:bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-xs"
            >
              <span>{t.nav.free_discovery}</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger (Single Clean Language + Menu Control) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors"
              aria-label={isMenuOpen ? t.common.close : "Menu"}
              aria-expanded={isMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 bg-white border-t border-slate-200 z-50 overflow-y-auto pb-28">
          <div className="container py-5 space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {t.common.language}
              </p>
              <LanguageSelector variant="mobile" />
            </div>

            <ul className="divide-y divide-slate-100 border-y border-slate-100">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.children ? (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileAccordion(
                            openMobileAccordion === link.label ? null : link.label
                          )
                        }
                        className="w-full flex items-center justify-between py-3.5 text-left font-semibold text-slate-900"
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            openMobileAccordion === link.label ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {openMobileAccordion === link.label && (
                        <div className="pb-3 pl-3 space-y-1 border-l-2 border-slate-200 ml-1 mb-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={`block py-2 px-3 text-sm rounded-lg ${
                                pathname === child.href
                                  ? "bg-red-50 text-[var(--primary)] font-semibold"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3.5 font-semibold ${
                        pathname === link.href ? "text-[var(--primary)]" : "text-slate-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="space-y-2.5 pt-1">
              <Link
                href="/iletisim"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-[var(--primary)] text-white rounded-xl font-semibold text-sm shadow-sm"
              >
                {t.nav.free_discovery}
              </Link>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${SITE_CONTACT.phoneRaw}`}
                  onClick={trackPhoneClick}
                  className="flex items-center justify-center gap-2 py-3 px-3 bg-slate-900 text-white rounded-xl font-semibold text-xs"
                >
                  <PhoneIcon className="w-4 h-4" />
                  {SITE_CONTACT.phoneLocal}
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="flex items-center justify-center gap-2 py-3 px-3 bg-[#16a34a] text-white rounded-xl font-semibold text-xs"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
