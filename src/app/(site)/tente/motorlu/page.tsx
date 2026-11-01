import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';
import { SITE_CONTACT, getWhatsAppUrl } from '@/lib/constants';
import {
    ArrowRightIcon,
    CheckIcon,
    MotorIcon,
    SunWindIcon,
    WhatsAppIcon,
} from '@/components/icons/ArchitecturalIcons';

export const metadata: Metadata = {
    title: 'Motorlu Tente Sistemleri | Ata Yapı',
    description:
        'Uzaktan kumandalı motorlu tente sistemleri. Rüzgar ve güneş sensörü otomasyonu, Somfy ve Becker tüp motor seçenekleri. Maltepe ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/tente/motorlu',
    },
};

const faqs = [
    {
        question: 'Motorlu tente nasıl çalışır?',
        answer: 'Sarım borusu içine gizlenen sessiz tüp motor (tubular motor) sayesinde uzaktan kumanda, duvar butonu veya akıllı ev uygulaması üzerinden tek tuşla açılıp kapanır.',
    },
    {
        question: 'Motorlu tente fiyatları ne kadar?',
        answer: 'Tente tipine (mafsallı, kasetli veya pergola), motor tork kapasitesine, markasına (Somfy, Becker, Mosel) ve sensör donanımına göre belirlenir.',
    },
    {
        question: 'Motorlu tenteye rüzgar sensörü eklenebilir mi?',
        answer: 'Evet. Titreşimli (3D darbe) veya pervaneli rüzgar sensörü eklendiğinde kuvvetli rüzgar algılandığı anda siz evde olmasanız bile tente otomatik olarak kapanır.',
    },
    {
        question: 'Elektrik kesildiğinde motorlu tente kapanır mı?',
        answer: 'Redüktörlü (manuel override) motor tercih edildiğinde elektrik kesintisi anında çevirme kolu ile tenteyi manuel olarak kapatabilirsiniz.',
    },
    {
        question: 'Mevcut manuel tenteme motor takılabilir mi?',
        answer: 'Mevcut tentenizin sarım borusu ve kol mekanizması sağlamsa şasi değişmeden içine tüp motor ve kumanda alıcısı entegre edilebilir.',
    },
    {
        question: 'Motorlu tente garanti süresi ne kadardır?',
        answer: 'Kullandığımız tüp motorlarda markaya bağlı olarak 2 yıldan 5 yıla kadar birebir üretici motor garantisi sunulmaktadır.',
    },
];

const features = [
    {
        code: '01',
        title: 'RF Uzaktan Kumanda',
        description: 'Çok kanallı radyo frekanslı kumanda ile birden fazla tenteyi tek tuşla yönetme.',
    },
    {
        code: '02',
        title: 'Otomatik Rüzgar Koruması',
        description: '3D salınım sensörü fırtına başlangıcında tenteyi otomatik toplayarak mekanizmayı korur.',
    },
    {
        code: '03',
        title: 'Sessiz Tüp Motor',
        description: 'Sarım borusu içine tamamen gizlenen yüksek torklu, termik korumalı sessiz motor.',
    },
    {
        code: '04',
        title: 'Akıllı Ev Entegrasyonu',
        description: 'Opsiyonel Wi-Fi modülü ile telefon uygulamasından ve sesli asistanlardan kontrol.',
    },
    {
        code: '05',
        title: 'Manuel Acil Kontrol',
        description: 'Elektrik kesintilerinde krank kolu ile müdahaleye imkan tanıyan redüktörlü motor opsiyonu.',
    },
    {
        code: '06',
        title: 'Hassas Kumaş Gerginliği',
        description: 'Elektronik limit switch ayarı sayesinde kumaşı her kapanışta milimetrik torkla toplar.',
    },
];

const brands = ['Somfy', 'Becker', 'Mosel', 'Nice', 'Dooya'];

export default function MotorluTentePage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200/80">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Tente', href: '/tente' },
                            { label: 'Motorlu Tente' },
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
                                <MotorIcon className="w-3.5 h-3.5 text-[var(--primary)]" />
                                Otomasyon & Sensörlü Kontrol
                            </span>
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Motorlu{' '}
                                <span className="text-[var(--primary)]">Tente Sistemleri</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                                Uzaktan kumanda ve akıllı rüzgar/güneş sensörleri ile yönetilen otomatik tente
                                çözümleri. Konut terasları, restoranlar ve kurumsal cepheler için zahmetsiz konfor.
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
                                    href={getWhatsAppUrl('Merhaba, motorlu tente sistemleri ve fiyat bilgisi almak istiyorum.')}
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
                                    src="/tente-service.png"
                                    alt="Motorlu Tente Sistemleri - Ata Yapı"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#0b0f19]/85 backdrop-blur-md border border-white/10 text-xs">
                                    <span className="text-slate-300 font-medium">Somfy & Becker Otomasyon</span>
                                    <span className="text-emerald-400 font-semibold">{SITE_CONTACT.phoneDisplay}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sensors */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container">
                    <div className="max-w-2xl mb-12">
                        <span className="section-eyebrow">İklim Otomasyonu</span>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Akıllı Sensör Seçenekleri
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80">
                            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[var(--primary)] mb-5">
                                <SunWindIcon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                3D Rüzgar & Salınım Sensörü
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Tente ön profiline kablosuz monte edilen ivme sensörü, rüzgar şiddeti güvenli sınırı
                                aştığında tenteyi otomatik olarak kapatır ve kolların zarar görmesini önler.
                            </p>
                            <ul className="space-y-2.5 text-sm text-slate-700">
                                {['Evde yokken dahi otomatik kapanma', 'Kademeli rüzgar hassasiyet ayarı', 'Kablo çekimi gerektirmeyen RF iletişim'].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5">
                                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80">
                            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[var(--primary)] mb-5">
                                <MotorIcon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                Güneş & Işık Yoğunluk Sensörü
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Cepheye vuran güneş ışığı şiddetine göre tenteyi otomatik açarak iç mekanın
                                aşırı ısınmasını ve mobilyaların solmasını engeller.
                            </p>
                            <ul className="space-y-2.5 text-sm text-slate-700">
                                {['Güneş çıktığında otomatik açılma', 'Klima ve soğutma enerjisinde tasarruf', 'Akşam saatlerinde otomatik toplanma'].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5">
                                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
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
                            Motorlu Tente Avantajları
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

            {/* Brands */}
            <section className="py-12 bg-white border-b border-slate-200/70">
                <div className="container">
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-6">
                        Uyguladığımız Motor & Otomasyon Markaları
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {brands.map((brand) => (
                            <div
                                key={brand}
                                className="px-6 py-3 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-800 font-semibold text-sm tracking-wide"
                            >
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Motorlu Tente Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

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
                            href="/tente/mafsalli"
                            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Mafsallı Tente
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
                title="Kumandalı & Sensörlü Tente Çözümleri"
                description="Yeni kurulum veya mevcut tentenize motor entegrasyonu için ücretsiz keşif talep edin."
            />
        </>
    );
}
