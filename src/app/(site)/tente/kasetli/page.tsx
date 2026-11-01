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
    SunWindIcon,
    WhatsAppIcon,
} from '@/components/icons/ArchitecturalIcons';

export const metadata: Metadata = buildProductMetadata('tente-kasetli', {
    title: 'Tam Kasetli Tente Sistemleri & Fiyatları | Motorlu & LED | Ata Yapı',
    description:
        'Tam kasetli tente sistemleri ile akrilik kumaş ve mekanizma koruması. Uzaktan kumandalı motorlu kontrol, modern alüminyum gövde ve ücretsiz keşif.',
});

const faqs = [
    {
        question: 'Kasetli tente nedir?',
        answer: 'Kasetli tente, kapandığında hem kumaşın hem de mafsal kollarının tam kapalı alüminyum kaset gövde içine gizlenerek yağmur, toz ve kış şartlarından korunduğu üst segment tente sistemidir.',
    },
    {
        question: 'Kasetli tentenin mafsallı tenteden farkı nedir?',
        answer: 'Mafsallı tentede kumaş rulosu açıkta kalırken, kasetli tentede sızdırmaz alüminyum kaset içinde tam koruma altındadır. Bu sayede kumaş temiz kalır ve ömrü belirgin şekilde uzar.',
    },
    {
        question: 'Kasetli tente fiyatları ne kadar?',
        answer: 'Cephe genişliği, açılım mesafesi, ithal akrilik kumaş serisi ve motor/sensör tercihine göre hesaplanır. Ücretsiz yerinde keşifle net fiyat teklifi hazırlanır.',
    },
    {
        question: 'Kasetli tente motorlu mu manuel mi üretilir?',
        answer: 'Tam kasetli tenteler genellikle uzaktan kumandalı tüp motorlu olarak uygulanır; talep halinde manuel kranklı üretim de mümkündür.',
    },
    {
        question: 'Kasetli tentenin ömrü ne kadardır?',
        answer: 'Alüminyum ekstrüzyon gövde ve solmaz ithal akrilik kumaş sayesinde 12-15 yıl ve üzeri sorunsuz kullanım ömrü sunar.',
    },
    {
        question: 'Kasetli tente hangi ölçülerde yapılabilir?',
        answer: 'Tek modülde 2 metreden 6 metre genişliğe ve 3.5 metre öne açılıma kadar özel ölçüde üretilebilir.',
    },
];

const features = [
    {
        code: '01',
        title: 'Tam Kaset Kumaş Koruması',
        description: 'Kapalı konumda kumaş ve kollar alüminyum kaset içinde dış etkenlerden tamamen izole edilir.',
    },
    {
        code: '02',
        title: '12–15 Yıl Uzun Ömür',
        description: 'Kış aylarında kar, is ve UV etkisinden korunan akrilik kumaş ilk günkü rengini korur.',
    },
    {
        code: '03',
        title: 'Mimari Cephe Estetiği',
        description: 'Kapandığında dış cephede yalnızca ince ve modern bir alüminyum profil çizgisi görünür.',
    },
    {
        code: '04',
        title: 'Uzaktan Kumandalı Motor',
        description: 'Sessiz tüp motor ve opsiyonel rüzgar sensörü ile tek tuşla güvenli kontrol.',
    },
    {
        code: '05',
        title: 'Solmaz Akrilik Kumaş',
        description: 'Su itici teflon kaplamalı, UV blokajlı ithal akrilik kumaş koleksiyonu.',
    },
    {
        code: '06',
        title: 'Entegre LED Aydınlatma',
        description: 'İsteğe bağlı kol altı veya kaset altı sıcak günışığı LED aydınlatma entegrasyonu.',
    },
];

export default function KasetliTentePage() {
    return (
        <>
            <ProductSeoSchema productId="tente-kasetli" />
            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200/80">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Tente', href: '/tente' },
                            { label: 'Kasetli Tente' },
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
                                <SunWindIcon className="w-3.5 h-3.5 text-[var(--primary)]" />
                                Tam Kasetli Mimari Gölgelendirme
                            </span>
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Kasetli{' '}
                                <span className="text-[var(--primary)]">Tente Sistemleri</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                                Kumaş ve mekanizmanın tam kapalı alüminyum kaset içinde korunduğu üst segment
                                gölgelendirme sistemi. Teras, villa ve prestijli ticari cepheler için uzun ömürlü yatırım.
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
                                    href={getWhatsAppUrl('Merhaba, kasetli tente sistemleri hakkında bilgi ve fiyat almak istiyorum.')}
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
                                    src="/kasetli-tente.png"
                                    alt="Kasetli Tente Sistemleri - Ata Yapı"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#0b0f19]/85 backdrop-blur-md border border-white/10 text-xs">
                                    <span className="text-slate-300 font-medium">Tam Kapalı Alüminyum Kaset</span>
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
                            Kasetli Tente Nedir?
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
                            <p>
                                Kasetli tente, tente kapalı konumdayken akrilik kumaşı ve çelik zincirli mafsal
                                kollarını elektrostatik boyalı ekstrüzyon alüminyum kaset içine tamamen hapseden
                                mimari gölgelendirme çözümüdür.
                            </p>
                            <p>
                                Standart tentelerde kış aylarında yağmur ve şehir tozuna maruz kalan kumaş zamanla
                                kirlenir; kasetli sistemde ise fırçalı conta yapısı kapanış sırasında kumaş yüzeyini
                                süpürerek koruma altına alır.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200/80">
                            {['Çelik Zincirli Mafsal Kol', 'İthal Solmaz Akrilik Kumaş', 'Somfy / Becker Motor Uyumu'].map((item) => (
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
                            Kasetli Tente Avantajları
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
            <FAQSection title="Kasetli Tente Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-slate-50 border-t border-slate-200/80">
                <div className="container">
                    <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Tente Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/tente/mafsalli"
                            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Mafsallı Tente
                        </Link>
                        <Link
                            href="/tente/motorlu"
                            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Motorlu Tente
                        </Link>
                        <Link
                            href="/tente"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Tüm Tente Sistemleri
                            <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTABlock
                title="Teras ve Balkonunuz İçin Kasetli Tente"
                description="Kumaş kartelası ve cephe ölçümü için ücretsiz yerinde keşif randevusu alın."
            />
        </>
    );
}
