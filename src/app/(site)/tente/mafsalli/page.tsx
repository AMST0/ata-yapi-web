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

export const metadata: Metadata = buildProductMetadata('tente-mafsalli', {
    title: 'Mafsallı Tente Sistemleri & Fiyatları | Balkon, Teras & Esnaf | Ata Yapı',
    description:
        'Mafsallı tente sistemleri ile balkon, teras ve mağaza cephelerinde ekonomik ve dayanıklı gölgelendirme. UV korumalı akrilik kumaş, ücretsiz keşif.',
});

const faqs = [
    {
        question: 'Mafsallı tente nedir?',
        answer: 'Mafsallı tente, yüksek gergili yaylı alüminyum kol mekanizması sayesinde ayak veya dikme gerektirmeden öne doğru açılıp kapanan klasik gölgelendirme sistemidir.',
    },
    {
        question: 'Mafsallı tente fiyatları ne kadar?',
        answer: 'Cephe genişliği, açılım ölçüsü, akrilik kumaş seçimi ve manuel/motorlu kontrol tercihine göre hesaplanır. Ücretsiz keşifle net fiyat sunulur.',
    },
    {
        question: 'Mafsallı tente manuel mi motorlu mu yapılabilir?',
        answer: 'Her iki seçenek de mevcuttur. Ekonomik manuel çevirme kollu sistem olarak üretilebildiği gibi, sonradan veya ilk kurulumda uzaktan kumandalı motor eklenebilir.',
    },
    {
        question: 'Mafsallı tente öne doğru ne kadar açılır?',
        answer: 'Cephe genişliğine bağlı olarak 1.50 m, 2.00 m, 2.50 m, 3.00 m ve 3.50 m standart kol açılımlarıyla üretilir.',
    },
    {
        question: 'Mafsallı tente yağmur ve güneşe dayanıklı mı?',
        answer: 'Su itici apre kaplamalı akrilik kumaş güneşin UV ışınlarını ve yaz yağmurlarını keser. Şiddetli fırtına ve yoğun kar yağışında tentenin kapalı tutulması önerilir.',
    },
    {
        question: 'Mafsallı tente eğimi ayarlanabilir mi?',
        answer: 'Evet, montaj sırasında cephenizin güneş alma açısına göre 5° ile 45° arasında eğim ayarı yapılır.',
    },
];

const features = [
    {
        code: '01',
        title: 'Dikmesiz Serbest Gölgelik',
        description: 'Alüminyum enjeksiyon mafsal kolları sayesinde zeminde ayak olmadan tam açık alan sağlar.',
    },
    {
        code: '02',
        title: 'Yüksek Fiyat / Performans',
        description: 'Balkon, kafe ve esnaf cepheleri için en ekonomik ve kendini kanıtlamış gölgelendirme sistemi.',
    },
    {
        code: '03',
        title: 'Geniş Kumaş Koleksiyonu',
        description: '100+ düz ve çizgili ithal akrilik kumaş deseni ile bina ve kurumsal kimliğe tam uyum.',
    },
    {
        code: '04',
        title: 'Ayarlanabilir Eğim Açısı',
        description: 'Batı ve güney cephelerde alçak güneş açısını kesmek için kademeli eğim ayarı.',
    },
    {
        code: '05',
        title: 'Alüminyum Koruyucu Saçak',
        description: 'Ruloyu üstten yağmurdan koruyan opsiyonel alüminyum üst çatı profili.',
    },
    {
        code: '06',
        title: 'Motor & Sensör Uyumu',
        description: 'İstenildiğinde tüp motor ve rüzgar sensörü entegrasyonuna uygun modüler şasi.',
    },
];

export default function MafsalliTentePage() {
    return (
        <>
            <ProductSeoSchema productId="tente-mafsalli" />
            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200/80">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Tente', href: '/tente' },
                            { label: 'Mafsallı Tente' },
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
                                Klasik Eklem Kollu Sistem
                            </span>
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Mafsallı{' '}
                                <span className="text-[var(--primary)]">Tente Sistemleri</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                                Yaylı alüminyum kol mekanizması ile açılıp kapanan klasik tente sistemi.
                                Balkonlar, teraslar ve mağaza vitrinleri için ekonomik, dayanıklı ve geniş
                                renk seçenekli gölgelendirme.
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
                                    href={getWhatsAppUrl('Merhaba, mafsallı tente fiyatları ve kumaş seçenekleri hakkında bilgi almak istiyorum.')}
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
                                    src="/mafsalli-tente.png"
                                    alt="Mafsallı Tente Sistemleri - Ata Yapı"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#0b0f19]/85 backdrop-blur-md border border-white/10 text-xs">
                                    <span className="text-slate-300 font-medium">Manuel & Motorlu Seçenek</span>
                                    <span className="text-emerald-400 font-semibold">{SITE_CONTACT.phoneDisplay}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Overview & Working Steps */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <span className="section-eyebrow">Çalışma Prensibi</span>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Mafsallı Tente Nasıl Çalışır?
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-10">
                            40x40 mm çelik taşıyıcı profil üzerine kurulan sistem, içten çelik zincirli alüminyum
                            kolların kumaşı sürekli gergin tutması prensibiyle çalışır. Manuel çevirme kolu veya
                            kumandalı motor ile istenilen açılım mesafesinde durdurulabilir.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    step: '01',
                                    title: 'Yaylı Mafsal Kolları',
                                    desc: 'Çelik zincirli alüminyum kollar açılış boyunca kumaşı sarkmadan gergin tutar.',
                                },
                                {
                                    step: '02',
                                    title: 'Galvaniz Sarım Borusu',
                                    desc: '70/78 mm oluklu galvaniz mil üzerine kumaş düzgün ve kırışıksız sarılır.',
                                },
                                {
                                    step: '03',
                                    title: 'UV Blokajlı Akrilik Kumaş',
                                    desc: '5 yıl solmazlık garantili kumaş ısıyı keserek balkon sıcaklığını düşürür.',
                                },
                            ].map((item) => (
                                <div key={item.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#0b0f19] text-white font-mono text-xs font-bold mb-4">
                                        {item.step}
                                    </span>
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200/80">
                            {['2.0m – 6.0m Cephe Genişliği', '3.5m Maksimum Öne Açılım', 'Saçaklı Korumalı Opsiyon'].map((item) => (
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
                            Mafsallı Tente Avantajları
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
            <FAQSection title="Mafsallı Tente Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-slate-50 border-t border-slate-200/80">
                <div className="container">
                    <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Tente Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/tente/kasetli"
                            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Kasetli Tente
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
                title="Balkon ve Mağaza Cepheniz İçin Mafsallı Tente"
                description="Ücretsiz yerinde keşif ve kumaş kartelası sunumu için bizimle iletişime geçin."
            />
        </>
    );
}
