import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';
import PricingExplainer from '@/components/seo/PricingExplainer';
import {
    districtPages,
    getDistrictPageBySlug,
    getAllDistrictSlugs,
    getPagesByService,
} from '@/data/districts';

// Generate static params for all district pages
export async function generateStaticParams() {
    return getAllDistrictSlugs().map((slug) => ({
        slug,
    }));
}

// Generate metadata for each page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = getDistrictPageBySlug(slug);

    if (!page) {
        return {
            title: 'Sayfa Bulunamadı',
        };
    }

    return {
        title: page.metaTitle,
        description: page.metaDescription,
        openGraph: {
            title: page.metaTitle,
            description: page.metaDescription,
            locale: 'tr_TR',
            type: 'website',
        },
        alternates: {
            canonical: `https://www.atayapi.site/bolge/${page.slug}`,
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

    // Get related district pages for same service (for internal linking)
    const relatedServicePages = getPagesByService(page.service).filter(
        (p) => p.slug !== page.slug
    );

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: page.serviceTitle, href: page.serviceHref },
                            { label: `${page.district} ${page.serviceTitle}` },
                        ]}
                    />
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            {page.district} Bölgesi
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            {page.h1}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            {page.intro}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                Ücretsiz Keşif
                            </Link>
                            <a
                                href="https://wa.me/905314002959"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                            {page.district}&apos;de Neden Ata Yapı?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {page.valueProposition.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                                >
                                    <svg
                                        className="w-5 h-5 mt-0.5 text-[var(--accent)] shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* System Selection */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            {page.systemSelection.title}
                        </h2>
                        <p className="text-gray-600">{page.systemSelection.description}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {page.systemSelection.options.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[var(--primary)]/20 transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {option.name}
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">{option.description}</p>
                                <ul className="space-y-2">
                                    {option.pros.map((pro, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {pro}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Note */}
            <PricingExplainer customNote={page.pricingNote} />

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ Section */}
            <FAQSection
                title={`${page.district} ${page.serviceTitle} Hakkında Sıkça Sorulan Sorular`}
                faqs={page.faqs}
            />

            {/* Related Pages (Internal Linking) */}
            {relatedServicePages.length > 0 && (
                <section className="py-12 bg-gray-50">
                    <div className="container">
                        <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Diğer Bölgelerde {page.serviceTitle}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {relatedServicePages.map((relatedPage) => (
                                <Link
                                    key={relatedPage.slug}
                                    href={`/bolge/${relatedPage.slug}`}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                                >
                                    {relatedPage.district} {relatedPage.serviceTitle}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Main Service Link */}
            <section className="py-8 bg-white border-t border-gray-100">
                <div className="container">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        <span className="text-gray-500">Daha fazla bilgi için:</span>
                        <Link
                            href={page.serviceHref}
                            className="text-[var(--primary)] hover:underline font-medium"
                        >
                            {page.serviceTitle} Sistemleri →
                        </Link>
                        <Link
                            href="/fiyatlandirma"
                            className="text-[var(--primary)] hover:underline font-medium"
                        >
                            Fiyatlandırma →
                        </Link>
                        <Link
                            href="/iletisim"
                            className="text-[var(--primary)] hover:underline font-medium"
                        >
                            İletişim →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <CTABlock
                title={`${page.district}'de ${page.serviceTitle} Yaptırmak İster misiniz?`}
                description="Ücretsiz keşif randevusu alın, size özel teklifimizi hazırlayalım."
            />
        </>
    );
}
