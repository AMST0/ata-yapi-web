import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';
import ProductSeoSchema from '@/components/seo/ProductSeoSchema';
import { buildProductMetadata } from '@/lib/seo-catalog';
import { SITE_CONTACT, getWhatsAppUrl } from '@/lib/constants';
import {
    ArrowRightIcon,
    CheckIcon,
    SparkGridIcon,
    WhatsAppIcon,
} from '@/components/icons/ArchitecturalIcons';

export const metadata: Metadata = buildProductMetadata('sineklik-pileli', {
    title: 'Pileli (Plise) Sineklik Sistemleri & Fiyatları | Ata Yapı',
    description:
        'Pileli (plise) akordiyon sineklik sistemleri ile modern ve şık pencere/kapı koruması. Dar eşikli, UV dayanımlı tül, Maltepe ve İstanbul geneli ücretsiz keşif.',
});

const faqs = [
    {
        question: 'Pileli sineklik nedir?',
        answer: 'Pileli (plise) sineklik, akordiyon tarzı katlanan modern sineklik sistemidir. Kullanılmadığında minimal bir alana toplanır ve görünmez hale gelir.',
    },
    {
        question: 'Pileli sineklik fiyatları ne kadar?',
        answer: 'Pileli sineklik fiyatları pencere veya kapı ölçüsüne ve profil rengine göre belirlenir. Yerinde ücretsiz keşif ile net fiyatlandırma yapılır.',
    },
    {
        question: 'Pileli sineklik temizliği nasıl yapılır?',
        answer: 'Pileli sineklik nemli bir bezle silinerek kolayca temizlenir. Kıvrımlara biriken toz hafif su sıkılarak veya yumuşak fırça ile alınır.',
    },
    {
        question: 'Pileli sineklik her pencereye uyar mı?',
        answer: 'Evet, pileli sineklik PVC, alüminyum ve ahşap pencere/kapı doğramalarına özel ölçü ile tam uyumlu şekilde monte edilir.',
    },
    {
        question: 'Pileli sineklik ne kadar dayanıklı?',
        answer: 'UV katkılı fiberglass tül, kopmaz gergi ipleri ve elektrostatik boyalı alüminyum profiller sayesinde yıllarca sorunsuz çalışır.',
    },
    {
        question: 'Pileli sineklik montajı ne kadar sürer?',
        answer: 'Standart bir dairenin tüm pencere ve kapılarına pileli sineklik montajı ortalama 1-2 saat içinde temiz işçilikle tamamlanır.',
    },
];

const features = [
    {
        code: '01',
        title: 'Minimal Mimari Profil',
        description: 'İnce alüminyum kasa yapısı sayesinde pencere ve kapı doğramalarıyla bütünleşir.',
    },
    {
        code: '02',
        title: 'Görünmez Katlanır Tül',
        description: 'Akordiyon plise yapısı kullanılmadığında kasa içine toplanarak görüş alanını kapatmaz.',
    },
    {
        code: '03',
        title: 'Raylı Ergonomik Hareket',
        description: 'Özel gergi ip mekanizması ile istenilen noktada durdurulabilir, tek elle açılıp kapanır.',
    },
    {
        code: '04',
        title: 'Sessiz Çalışma',
        description: 'Sürtünmeyi azaltan alt ve üst kılavuz kanalları sayesinde sessizce kayar.',
    },
    {
        code: '05',
        title: 'UV Dayanımlı Fiberglass',
        description: 'Güneş ışınlarına, neme ve dış ortam koşullarına dayanıklı özel plise tül.',
    },
    {
        code: '06',
        title: 'Dikey & Yatay Uygulama',
        description: 'Pencerelerde dikey veya yatay, geniş sürgülü kapılarda duble (çift kanat) üretim imkanı.',
    },
];

export default function PileliSineklikPage() {
    return (
        <>
            <ProductSeoSchema productId="sineklik-pileli" />
            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200/80">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Sineklik', href: '/sineklik' },
                            { label: 'Pileli Sineklik' },
                        ]}
                    />
                </div>
            </div>

            {/* Hero */}
            <section className="relative py-20 lg:py-28 bg-[#0b0f19] arch-grid-dark text-white overflow-hidden">
                <div className="container relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.06] border border-white/10 rounded-full text-xs font-semibold uppercase tracking-[0.16em] text-slate-300 mb-6">
                                <SparkGridIcon className="w-3.5 h-3.5 text-[var(--primary)]" />
                                Plise Akordiyon Sistem
                            </span>
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Pileli (Plise){' '}
                                <span className="text-[var(--primary)]">Sineklik</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                                Akordiyon tarzı katlanan modern sineklik çözümü. Kullanılmadığında
                                alüminyum kasasına toplanır, doğrama renginize birebir uyum sağlar ve
                                yaşam alanlarınızın estetiğini korur.
                            </p>
                            <div className="flex flex-wrap gap-3.5">
                                <Link
                                    href="/iletisim"
                                    className="btn-press inline-flex items-center gap-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-red-950/30"
                                >
                                    Ücretsiz Keşif Planla
                                    <ArrowRightIcon className="w-4 h-4" />
                                </Link>
                                <a
                                    href={getWhatsAppUrl('Merhaba, pileli sineklik için ölçü ve fiyat bilgisi almak istiyorum.')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-press inline-flex items-center gap-2.5 bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-dark)] text-white px-7 py-4 rounded-xl font-semibold transition-all"
                                >
                                    <WhatsAppIcon className="w-4 h-4" />
                                    WhatsApp Hattı
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src="/sineklik-service.png"
                                    alt="Pileli Sineklik Sistemleri - Ata Yapı"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#0b0f19]/85 backdrop-blur-md border border-white/10 text-xs">
                                    <span className="text-slate-300 font-medium">Özel Ölçü Alüminyum Kasa</span>
                                    <span className="text-emerald-400 font-semibold">{SITE_CONTACT.phoneDisplay}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Overview */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <span className="section-eyebrow">Sistem Özeti</span>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Pileli Sineklik Nedir?
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
                            <p>
                                Pileli sineklik (plise sineklik), özel katlama teknolojisiyle üretilmiş fiberglass
                                tülün akordiyon formunda katlanarak açılıp kapandığı yeni nesil sineklik sistemidir.
                                Menteşe payı gerektirmediği için dar balkonlarda ve panjurlu pencerelerde kusursuz çalışır.
                            </p>
                            <p>
                                Antrasit gri, beyaz, altın meşe ve maun başta olmak üzere mevcut PVC veya alüminyum
                                doğramalarınıza tam uyumlu elektrostatik toz boyalı profillerle üretilir.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200/80">
                            {['Panjur & Cam Balkon Uyumlu', 'RAL Renk Seçenekleri', 'Duble Kapı Uygulaması'].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                                    <span className="w-5 h-5 rounded-full bg-red-50 text-[var(--primary)] flex items-center justify-center shrink-0">
                                        <CheckIcon className="w-3.5 h-3.5" />
                                    </span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 lg:py-24 bg-slate-50 arch-grid-light border-y border-slate-200/70">
                <div className="container">
                    <div className="max-w-2xl mb-12">
                        <span className="section-eyebrow">Teknik Avantajlar</span>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Pileli Sineklik Avantajları
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.code}
                                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 transition-all shadow-sm"
                            >
                                <span className="inline-block text-xs font-mono font-bold text-[var(--primary)] bg-red-50 px-2.5 py-1 rounded-md mb-4">
                                    {feature.code}
                                </span>
                                <h3
                                    className="font-bold text-slate-900 text-lg mb-2"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Pileli Sineklik Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-slate-50 border-t border-slate-200/80">
                <div className="container">
                    <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Sineklik Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/sineklik/menteseli"
                            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Menteşeli Sineklik
                        </Link>
                        <Link
                            href="/sineklik/kedi-sineklik"
                            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Kedi Sinekliği
                        </Link>
                        <Link
                            href="/sineklik"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Tüm Sineklik Sistemleri
                            <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTABlock
                title="Pileli Sineklik Ölçü ve Keşif Talebi"
                description="Pencere ve kapılarınıza özel ölçü pileli sineklik için ücretsiz keşif randevusu oluşturun."
            />
        </>
    );
}
