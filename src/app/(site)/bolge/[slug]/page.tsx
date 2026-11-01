import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/seo/FAQSection";
import CTABlock from "@/components/seo/CTABlock";
import WhyAtaYapi from "@/components/seo/WhyAtaYapi";
import PricingExplainer from "@/components/seo/PricingExplainer";
import { getWhatsAppUrl } from "@/lib/constants";
import {
  CheckIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/icons/ArchitecturalIcons";
import {
  getDistrictPageBySlug,
  getAllDistrictSlugs,
  getPagesByService,
} from "@/data/districts";

export async function generateStaticParams() {
  return getAllDistrictSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getDistrictPageBySlug(slug);

  if (!page) {
    return {
      title: "Sayfa Bulunamadı",
    };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      locale: "tr_TR",
      type: "website",
    },
    alternates: {
      canonical: `https://www.xn--atayap-u9a.site/bolge/${page.slug}`,
    },
  };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getDistrictPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const relatedServicePages = getPagesByService(page.service).filter(
    (p) => p.slug !== page.slug
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: page.serviceTitle, href: page.serviceHref },
              { label: `${page.district} ${page.serviceTitle}` },
            ]}
          />
        </div>
      </div>

      {/* Architectural Hero */}
      <section className="relative py-20 lg:py-24 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold tracking-wide text-slate-200 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>{page.district} BÖLGESİ • ÜCRETSİZ KEŞİF</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {page.h1}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              {page.intro}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/iletisim"
                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <span>Ücretsiz Keşif</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsAppUrl(`Merhaba, ${page.district} bölgesinde ${page.serviceTitle} için bilgi almak istiyorum.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              {page.district} Bölgesinde Neden Ata Yapı?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.valueProposition.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-xl"
                >
                  <CheckIcon className="w-4 h-4 mt-1 text-[var(--primary)] shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Selection */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {page.systemSelection.title}
            </h2>
            <p className="text-slate-600">{page.systemSelection.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {page.systemSelection.options.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-slate-900 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-xs font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                  {option.name}
                </h3>
                <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                  {option.description}
                </p>
                <ul className="space-y-2 pt-4 border-t border-slate-100">
                  {option.pros.map((pro, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-700"
                    >
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingExplainer customNote={page.pricingNote} />

      <WhyAtaYapi />

      <FAQSection
        title={`${page.district} ${page.serviceTitle} Hakkında Sıkça Sorulan Sorular`}
        faqs={page.faqs}
      />

      {relatedServicePages.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="container">
            <h2 className="text-lg font-bold text-slate-900 mb-5">
              Diğer Hizmet Bölgelerimizde {page.serviceTitle}
            </h2>
            <div className="flex flex-wrap gap-2.5 text-sm font-medium">
              {relatedServicePages.map((relatedPage) => (
                <Link
                  key={relatedPage.slug}
                  href={`/bolge/${relatedPage.slug}`}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
                >
                  {relatedPage.district} {relatedPage.serviceTitle}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-8 bg-white border-t border-slate-200">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium">
            <span className="text-slate-500">İlgili Sayfalar:</span>
            <Link
              href={page.serviceHref}
              className="text-slate-900 hover:text-[var(--primary)] transition-colors"
            >
              {page.serviceTitle} Sistemleri →
            </Link>
            <Link
              href="/fiyatlandirma"
              className="text-slate-900 hover:text-[var(--primary)] transition-colors"
            >
              Fiyatlandırma →
            </Link>
            <Link
              href="/iletisim"
              className="text-slate-900 hover:text-[var(--primary)] transition-colors"
            >
              İletişim →
            </Link>
          </div>
        </div>
      </section>

      <CTABlock
        title={`${page.district} Bölgesinde ${page.serviceTitle} Teklifi Alın`}
        description="Ücretsiz keşif randevusu oluşturun, ölçülerinize özel net teklifimizi hazırlayalım."
      />
    </>
  );
}
