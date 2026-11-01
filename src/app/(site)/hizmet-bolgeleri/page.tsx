import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CTABlock from "@/components/seo/CTABlock";
import { districtPages } from "@/data/districts";
import { SEO_PRODUCT_CATALOG } from "@/lib/seo-catalog";
import { SITE_CONTACT } from "@/lib/constants";
import {
  ArrowRightIcon,
  MapPinIcon,
  LayersIcon,
} from "@/components/icons/ArchitecturalIcons";

export const metadata: Metadata = {
  title:
    "Hizmet Bölgelerimiz & Tüm Ürün Kataloğu | Maltepe, Kadıköy, Kartal, Pendik, Ataşehir & Ege | Ata Yapı",
  description:
    "Ata Yapı hizmet bölgeleri ve tüm mimari sistem kataloğu: İstanbul Anadolu Yakası (Maltepe, Kadıköy, Kartal, Pendik, Ataşehir), Balıkesir, Edremit, Altınoluk, İzmir ve Çanakkale giyotin cam, cam balkon, sineklik, tente ve PVC servisi.",
  keywords: [
    "ata yapı hizmet bölgeleri",
    "maltepe cam balkon",
    "maltepe giyotin cam",
    "kadıköy giyotin cam",
    "kartal cam balkon",
    "pendik cam balkon",
    "ataşehir giyotin cam",
    "balıkesir giyotin cam",
    "izmir giyotin cam",
  ],
  alternates: {
    canonical: `${SITE_CONTACT.siteUrl}/hizmet-bolgeleri`,
  },
  openGraph: {
    title: "Hizmet Bölgelerimiz & Ürün Kataloğu | Ata Yapı",
    description:
      "İstanbul Anadolu Yakası, Marmara ve Ege genelinde motorlu giyotin cam, cam balkon, sineklik ve tente sistemleri.",
    url: `${SITE_CONTACT.siteUrl}/hizmet-bolgeleri`,
    images: [
      {
        url: "/giyotin-cam-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Ata Yapı Hizmet Bölgeleri ve Ürün Kataloğu",
      },
    ],
  },
};

export default function HizmetBolgeleriPage() {
  const activeDistrictPages = districtPages.filter(
    (p) => p.service !== "teleskopik-garaj"
  );

  const groupedByDistrict = activeDistrictPages.reduce<
    Record<string, typeof activeDistrictPages>
  >((acc, page) => {
    if (!acc[page.district]) {
      acc[page.district] = [];
    }
    acc[page.district].push(page);
    return acc;
  }, {});

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ata Yapı Hizmet Bölgeleri ve Ürün Kataloğu",
    url: `${SITE_CONTACT.siteUrl}/hizmet-bolgeleri`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: SEO_PRODUCT_CATALOG.length + activeDistrictPages.length,
      itemListElement: [
        ...SEO_PRODUCT_CATALOG.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: p.name,
          url: `${SITE_CONTACT.siteUrl}${p.path}`,
        })),
        ...activeDistrictPages.map((d, idx) => ({
          "@type": "ListItem",
          position: SEO_PRODUCT_CATALOG.length + idx + 1,
          name: d.h1,
          url: `${SITE_CONTACT.siteUrl}/bolge/${d.slug}`,
        })),
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
      />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Hizmet Bölgeleri & Ürün Dizini" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-[#0b0f19] text-white border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
        <div className="container relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold tracking-wider uppercase text-slate-200 mb-5">
            <MapPinIcon className="w-3.5 h-3.5 text-red-500" />
            <span>İSTANBUL • MARMARA • EGE • AVRUPA İHRACAT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Hizmet Bölgelerimiz &{" "}
            <span className="text-red-500">Mimari Sistem Kataloğu</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Maltepe/İstanbul merkez üretim tesisimizden Anadolu Yakası&apos;nın tüm
            ilçelerine aynı gün ücretsiz keşif; Balıkesir, Edremit, Altınoluk, İzmir
            ve Çanakkale hattında uzman saha montajı ve Avrupa geneline demonte
            toptan sistem sevkiyatı sağlıyoruz.
          </p>
        </div>
      </section>

      {/* Complete 16-Product Directory */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2">
                <LayersIcon className="w-4 h-4" />
                <span>ÜRÜN & SİSTEM DİZİNİ ({SEO_PRODUCT_CATALOG.length} SİSTEM)</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Üretimini Yaptığımız Tüm Sistemler
              </h2>
            </div>
            <Link
              href="/fiyatlandirma"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:underline"
            >
              <span>Metraj & Fiyat Hesaplayıcı</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEO_PRODUCT_CATALOG.map((product) => (
              <Link
                key={product.id}
                href={product.path}
                className="group p-5 rounded-xl border border-slate-200 hover:border-slate-900 bg-slate-50/60 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white mb-2.5">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-slate-900 group-hover:text-[var(--primary)] transition-colors text-base mb-1.5">
                    {product.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Teknik Detay & Fiyat</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Service Matrix */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2">
              <MapPinIcon className="w-4 h-4" />
              <span>BÖLGESEL KEŞİF & MONTAJ AĞI</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              İlçe ve Şehir Bazlı Hizmet Sayfalarımız
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Bulunduğunuz bölgeye özel keşif süreci, iklim/rüzgar dayanım çözümleri ve
              sistem önerilerini inceleyin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedByDistrict).map(([districtName, pages]) => (
              <div
                key={districtName}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-red-50 text-[var(--primary)] flex items-center justify-center">
                      <MapPinIcon className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {districtName}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {pages.length} Hizmet
                  </span>
                </div>

                <ul className="space-y-2">
                  {pages.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/bolge/${p.slug}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700 hover:text-[var(--primary)] transition-colors group"
                      >
                        <span>{p.title}</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 text-slate-300 group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        title="Bölgeniz İçin Ücretsiz Keşif Randevusu Oluşturun"
        description="Uzman teknik ekibimiz yerinde lazer ölçüm ve numune sunumu ile projenize en uygun sistemi belirlesin."
      />
    </>
  );
}

