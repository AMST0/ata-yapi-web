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
    ShieldIcon,
    WhatsAppIcon,
} from '@/components/icons/ArchitecturalIcons';

export const metadata: Metadata = {
    title: 'Kedi Sinekliği Sistemleri | Ata Yapı - Çelik & Pet Tül',
    description:
        'Kedi sinekliği ile evcil hayvanlarınızı yüksekten düşmeye karşı koruyun. Yırtılmaz çelik ve pet tül, kilitli alüminyum çerçeve. Maltepe ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/sineklik/kedi-sineklik',
    },
};

const faqs = [
    {
        question: 'Kedi sinekliğinin normal sineklikten farkı nedir?',
        answer: 'Kedi sinekliğinde standart fiberglass tül yerine tırmalamaya dayanıklı kalın PVC kaplı Pet-Screen veya paslanmaz çelik tel örgü kullanılır; ayrıca kanadın açılmaması için emniyet mandalı uygulanır.',
    },
    {
        question: 'Kedi sinekliği yüksek katlarda tam güvenlik sağlar mı?',
        answer: 'Evet. Alüminyum çerçeveye derin fitille preslenen yırtılmaz tül ve dışarıdan açılmayı engelleyen emniyet kilidi sayesinde kedilerin pencereden sarkmasını ve düşmesini engeller.',
    },
    {
        question: 'Kedi sinekliği fiyatları ne kadar?',
        answer: 'Seçilen tül tipine (güçlendirilmiş Pet-Screen veya paslanmaz çelik tül) ve pencere/kapı ölçüsüne göre fiyatlandırılır. Ücretsiz keşifte numuneler gösterilerek net teklif verilir.',
    },
    {
        question: 'Pet-Screen mi paslanmaz çelik tül mü tercih etmeliyim?',
        answer: 'Tırmalama alışkanlığı yoğun veya kilolu kediler için paslanmaz çelik/alüminyum tel tül önerilir. Yavru ve sakin kedilerde kalın dokulu Pet-Screen ekonomik ve güvenli bir çözümdür.',
    },
    {
        question: 'Kedi sinekliği hava ve ışık geçişini engeller mi?',
        answer: 'Hayır, ince gözenekli tel ve pet tül yapısı evin doğal hava sirkülasyonunu ve gün ışığını kesmeden tam koruma sağlar.',
    },
    {
        question: 'Mevcut sinekliğime kedi tülü takılabilir mi?',
        answer: 'Mevcut sinekliğinizin alüminyum kasası ve menteşeleri sağlamsa tül değişimi ve emniyet mandalı ilavesi yapılabilir; plastik veya zayıf kasalarda komple yenileme önerilir.',
    },
];

const features = [
    {
        code: '01',
        title: 'Yırtılmaz Pet & Çelik Tül',
        description: 'Standart sineklik tülüne göre 5 kata kadar daha yüksek çekme ve tırmalama mukavemeti.',
    },
    {
        code: '02',
        title: 'Emniyet Kilit Mandalı',
        description: 'Kedinin pati veya ağırlığıyla kanadı iterek açmasını önleyen mekanik emniyet kilidi.',
    },
    {
        code: '03',
        title: 'Güçlendirilmiş Alüminyum Kasa',
        description: 'Yüke karşı esnemeyen kalın etli alüminyum profil ve metal destekli menteşe bağlantısı.',
    },
    {
        code: '04',
        title: 'UV & Korozyon Direnci',
        description: 'Güneş altında gevrekleşmeyen, yağmurda paslanmayan dış cephe uyumlu malzeme.',
    },
    {
        code: '05',
        title: 'Haşere + Evcil Hayvan Koruması',
        description: 'Hem evcil dostunuzun güvenliğini sağlar hem de sinek ve böcek girişini %100 keser.',
    },
    {
        code: '06',
        title: 'Tam Hava Sirkülasyonu',
        description: 'Yaz aylarında pencerelerinizi güvenle sonuna kadar açık bırakabilme özgürlüğü.',
    },
];

export default function KediSineklikPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200/80">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Sineklik', href: '/sineklik' },
                            { label: 'Kedi Sinekliği' },
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
                                <ShieldIcon className="w-3.5 h-3.5 text-[var(--primary)]" />
                                Evcil Hayvan Güvenlik Sistemi
                            </span>
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Kilitli Kedi{' '}
                                <span className="text-[var(--primary)]">Sinekliği</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                                Evcil hayvanlarınızın güvenliği için özel üretilen yırtılmaz çelik / pet tüllü
                                ve emniyet mandallı alüminyum sineklik sistemi. Pencerelerinizi gönül rahatlığıyla açın.
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
                                    href={getWhatsAppUrl('Merhaba, kedi sinekliği için ölçü ve fiyat bilgisi almak istiyorum.')}
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
                                    alt="Kedi Sinekliği Sistemleri - Ata Yapı"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#0b0f19]/85 backdrop-blur-md border border-white/10 text-xs">
                                    <span className="text-slate-300 font-medium">Çelik Tül & Emniyet Mandallı</span>
                                    <span className="text-emerald-400 font-semibold">{SITE_CONTACT.phoneDisplay}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety Notice */}
            <section className="py-6 bg-amber-50/80 border-b border-amber-200/80">
                <div className="container">
                    <div className="flex items-start gap-4 max-w-4xl mx-auto">
                        <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-amber-100 text-amber-800 rounded-xl border border-amber-200">
                            <ShieldIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">
                                Yüksek Kat Güvenlik Uyarısı
                            </h2>
                            <p className="text-slate-700 text-sm leading-relaxed">
                                Standart tül sineklikler yalnızca haşere engellemek içindir; kedilerin tırmalaması veya
                                yaslanması halinde yırtılabilir. Evcil hayvan bulunan dairelerde mutlaka emniyet mandallı
                                kedi sinekliği kullanılmalıdır.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mesh Comparison */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container">
                    <div className="max-w-2xl mb-12">
                        <span className="section-eyebrow">Malzeme Seçenekleri</span>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Kedi Sinekliği Tül Tipleri
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80">
                            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full mb-4">
                                Standart Koruma
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                Güçlendirilmiş Pet-Screen Tül
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Kalın vinil kaplı polyester dokuma tül. Standart sineklik tülüne göre 3-4 kat daha kalındır;
                                orta hareketlilikteki kediler için esnek ve güvenli koruma sunar.
                            </p>
                            <ul className="space-y-2.5 text-sm text-slate-700">
                                {['Esnek ve darbe emici doku', 'Paslanma yapmaz, kolay silinir', 'Ekonomik fiyat avantajı'].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5">
                                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#0b0f19] text-white rounded-2xl p-8 border border-slate-800">
                            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-red-300 bg-red-500/15 border border-red-500/30 px-3 py-1 rounded-full mb-4">
                                Maksimum Mukavemet
                            </span>
                            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                Paslanmaz Çelik / Alüminyum Tel Tül
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                Tırmalamaya ve ısırmaya karşı en yüksek mukavemeti sunan metal örgü tül.
                                Aktif, tırmanmayı seven veya iri kediler için kesin güvenlik sağlar.
                            </p>
                            <ul className="space-y-2.5 text-sm text-slate-200">
                                {['Pençe ve tırnakla yırtılmaz metal örgü', 'Emniyet mandalı + çelik perçinli menteşe', '10+ yıl formunu koruyan ömür'].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5">
                                        <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
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
                        <span className="section-eyebrow">Teknik Detaylar</span>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Kedi Sinekliği Özellikleri
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
            <FAQSection title="Kedi Sinekliği Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-slate-50 border-t border-slate-200/80">
                <div className="container">
                    <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Sineklik Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/sineklik/pileli"
                            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Pileli Sineklik
                        </Link>
                        <Link
                            href="/sineklik/menteseli"
                            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Menteşeli Sineklik
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
                title="Kediniz İçin Güvenli Pencere & Balkon"
                description="Çelik ve Pet-Screen kedi sinekliği numunelerimizi görmek için ücretsiz keşif talep edin."
            />
        </>
    );
}
