"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { SITE_CONTACT } from "@/lib/constants";
import {
  ArrowRightIcon,
  CheckIcon,
  InstagramIcon,
  ShareIcon,
} from "@/components/icons/ArchitecturalIcons";

interface ShowcaseItem {
  id: string;
  image: string;
  href: string;
  tag: { tr: string; en: string; de: string };
  title: { tr: string; en: string; de: string };
  location: { tr: string; en: string; de: string };
  spec: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "giyotin-restoran",
    image: "/giyotin-cam-hero.jpg",
    href: "/giyotin-cam/motorlu",
    tag: {
      tr: "Motorlu Giyotin Cam",
      en: "Motorized Guillotine Glass",
      de: "Motorisiertes Guillotine-Glas",
    },
    title: {
      tr: "Panoramik Restoran & Teras Cephesi",
      en: "Panoramic Restaurant & Terrace Facade",
      de: "Panoramische Restaurant- & Terrassenfassade",
    },
    location: {
      tr: "Maltepe — Kadıköy Sahil Hattı",
      en: "Istanbul Coastal Commercial Project",
      de: "Gastronomieprojekt Istanbul",
    },
    spec: "Somfy Motor • 4+12+4 Isıcam",
  },
  {
    id: "giyotin-villa",
    image: "/giyotin-cam-terrace.png",
    href: "/giyotin-cam/uygulamalar",
    tag: {
      tr: "Kış Bahçesi & Villa",
      en: "Winter Garden & Villa",
      de: "Wintergarten & Villa",
    },
    title: {
      tr: "Pergola Altı Kumandalı Dikey Cam",
      en: "Remote-Controlled Pergola Glazing",
      de: "Ferngesteuerte Pergola-Verglasung",
    },
    location: {
      tr: "Balıkesir — Edremit / Altınoluk",
      en: "Aegean Villa Terrace Application",
      de: "Villenterrasse Ägäis",
    },
    spec: "RAL 7016 Antrasit • EPDM İzolasyon",
  },
  {
    id: "isicamli-balkon",
    image: "/hero-balcony.png",
    href: "/cam-balkon/isi-camli",
    tag: {
      tr: "Isıcamlı Cam Balkon",
      en: "Double-Glazed Balcony",
      de: "Isolierglas-Balkonverglasung",
    },
    title: {
      tr: "4 Mevsim Yalıtımlı Konut Balkonu",
      en: "4-Season Insulated Residential Balcony",
      de: "4-Jahreszeiten Isolierte Balkonlösung",
    },
    location: {
      tr: "Ataşehir & Kartal Rezidans",
      en: "High-Rise Residential Project",
      de: "Wohnanlage Istanbul",
    },
    spec: "Temperli Çift Cam • Çelik Rulman",
  },
  {
    id: "surme-sistem",
    image: "/cam-balkon-2.png",
    href: "/cam-balkon/surme",
    tag: {
      tr: "Eşiksiz Sürme Sistem",
      en: "Threshold-Free Sliding Glass",
      de: "Schwellenlose Schiebeverglasung",
    },
    title: {
      tr: "Minimalist Teras & Veranda Geçişi",
      en: "Minimalist Veranda Sliding System",
      de: "Minimalistisches Veranda-Schiebesystem",
    },
    location: {
      tr: "Pendik — Kurtköy Villa Projesi",
      en: "Villa Patio Glazing",
      de: "Villenprojekt Kurtköy",
    },
    spec: "5 Raylı Alüminyum • Kenetli Profil",
  },
  {
    id: "kasetli-tente",
    image: "/kasetli-tente.png",
    href: "/tente/kasetli",
    tag: {
      tr: "Tam Kasetli Motorlu Tente",
      en: "Full-Cassette Motorized Awning",
      de: "Vollkassetten-Motor-Markise",
    },
    title: {
      tr: "Sensörlü Mimari Gölgelendirme",
      en: "Wind-Sensor Architectural Shading",
      de: "Architektonischer Sonnenschutz mit Windsensor",
    },
    location: {
      tr: "Bağdat Caddesi & Moda",
      en: "Commercial & Residential Terrace",
      de: "Terrassenbeschattung",
    },
    spec: "UV Akrilik Kumaş • LED Opsiyon",
  },
  {
    id: "plise-sineklik",
    image: "/sineklik-service.png",
    href: "/sineklik/kedi-sineklik",
    tag: {
      tr: "Plise & Kedi Sinekliği",
      en: "Pleated & Pet-Safe Screen",
      de: "Plissee- & Katzenschutzgitter",
    },
    title: {
      tr: "Yırtılmaz Çelik Tüllü Tam Koruma",
      en: "Tear-Proof Steel Mesh Safety Screen",
      de: "Reißfestes Edelstahlgewebe-Schutzsystem",
    },
    location: {
      tr: "İstanbul Geneli Hızlı Montaj",
      en: "Custom Millimetric Production",
      de: "Maßgefertigte Produktion",
    },
    spec: "Çelik / Pet-Screen • Emniyet Kilidi",
  },
];

export default function ProjectShowcase() {
  const { language } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy =
    language === "en"
      ? {
          eyebrow: "PROJECT SHOWCASE & INSTAGRAM",
          title: "Real Architectural Applications from Our Factory",
          subtitle:
            "Explore our motorized guillotine glass, insulated balcony glazing, awning and screen systems — follow us on Instagram for daily workshop videos and live installations.",
          followBtn: `Follow ${SITE_CONTACT.instagramHandle}`,
          allCatalogBtn: "All Systems & Service Areas",
          inspect: "Inspect System",
          share: "Share",
          copied: "Link Copied",
        }
      : language === "de"
      ? {
          eyebrow: "REFERENZGALERIE & INSTAGRAM",
          title: "Reale Architekturprojekte aus Unserer Fertigung",
          subtitle:
            "Entdecken Sie unsere motorisierten Guillotine-Glassysteme, Isolierglas-Balkone und Markisen — folgen Sie uns auf Instagram für aktuelle Montagevideos direkt ab Werk.",
          followBtn: `Folgen ${SITE_CONTACT.instagramHandle}`,
          allCatalogBtn: "Alle Systeme & Regionen",
          inspect: "System ansehen",
          share: "Teilen",
          copied: "Kopiert",
        }
      : {
          eyebrow: "UYGULAMA VİTRİNİ & INSTAGRAM",
          title: "Atölyemizden Gerçek Mimari Uygulamalar",
          subtitle:
            "Motorlu giyotin cam, ısıcamlı cam balkon, kasetli tente ve kedi sinekliği projelerimizi inceleyin; güncel şantiye videoları ve kampanyalar için Instagram hesabımızı takip edin.",
          followBtn: `Instagram'da Takip Et (${SITE_CONTACT.instagramHandle})`,
          allCatalogBtn: "Tüm Sistemler & Hizmet Bölgeleri",
          inspect: "Sistemi İncele",
          share: "Paylaş",
          copied: "Link Kopyalandı",
        };

  const handleShare = async (item: ShowcaseItem) => {
    const shareUrl = `${SITE_CONTACT.siteUrl}${item.href}`;
    const titleText = item.title[language];
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${titleText} | Ata Yapı`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard copy if user cancels or share fails
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>{copy.eyebrow}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {copy.title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={SITE_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-opacity"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{copy.followBtn}</span>
            </a>
            <Link
              href="/hizmet-bolgeleri"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-900 text-slate-800 font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>{copy.allCatalogBtn}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 6-Card Architectural Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE_ITEMS.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <article
                key={item.id}
                className="group rounded-2xl border border-slate-200 hover:border-slate-900 bg-white overflow-hidden transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.title[language]} - Ata Yapı`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/85 via-[#0b0f19]/20 to-transparent" />
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#0b0f19]/85 backdrop-blur-xs text-white text-[11px] font-semibold border border-white/15">
                      {item.tag[language]}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleShare(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 hover:bg-white text-slate-900 text-[11px] font-semibold transition-colors shadow-xs"
                      aria-label={copy.share}
                    >
                      {isCopied ? (
                        <>
                          <CheckIcon className="w-3 h-3 text-emerald-600" />
                          <span>{copy.copied}</span>
                        </>
                      ) : (
                        <>
                          <ShareIcon className="w-3 h-3" />
                          <span>{copy.share}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-slate-200 font-mono">
                    <span>{item.spec}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-1">
                      {item.location[language]}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[var(--primary)] transition-colors">
                      <Link href={item.href}>{item.title[language]}</Link>
                    </h3>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-[var(--primary)] transition-colors"
                    >
                      <span>{copy.inspect}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <a
                      href={SITE_CONTACT.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-pink-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

