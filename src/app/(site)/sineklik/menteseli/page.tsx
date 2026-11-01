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
    BuildingIcon,
    CheckIcon,
    SparkGridIcon,
    WhatsAppIcon,
} from '@/components/icons/ArchitecturalIcons';

export const metadata: Metadata = {
    title: 'Menteşeli Sineklik Sistemleri | Ata Yapı',
    description:
        'Menteşeli sineklik sistemleri ile kapı ve pencere tipi pratik açılım. Balkon kapıları için dayanıklı çözüm. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/sineklik/menteseli',
    },
};

const faqs = [
    {
        question: 'Menteşeli sineklik nedir?',
        answer: 'Menteşeli sineklik, dayanıklı alüminyum çerçevesi menteşeler ile doğramaya bağlanan, kapı veya pencere kanadı gibi dışa doğru açılıp kapanan sineklik sistemidir.',
    },
    {
        question: 'Menteşeli sineklik hangi alanlar için uygundur?',
        answer: 'Özellikle sık girilip çıkılan balkon kapıları, bahçe ve teras çıkışları ile panjur bulunmayan pencereler için ideal ve ekonomik bir çözümdür.',
    },
    {
        question: 'Menteşeli sineklik fiyatları ne kadar?',
        answer: 'Fiyatlar kapı veya pencere ölçüsüne, profil rengine ve tül tipine göre belirlenir. Ücretsiz keşif sonrası net fiyat sunulur.',
    },
    {
        question: 'Menteşeli sineklik kendiliğinden kapanır mı?',
        answer: 'İsteğe bağlı yaylı menteşe ve mıknatıslı kilit karşılığı uygulanarak sineklik kanadının bırakıldığında kendiliğinden kapanması sağlanabilir.',
    },
    {
        question: 'Menteşeli sineklik kışın çıkarılabilir mi?',
        answer: 'Evet, geçmeli pimli menteşe yapısı sayesinde kış aylarında alet gerektirmeden yerinden çıkarılıp saklanabilir veya yıkanabilir.',
    },
    {
        question: 'Menteşeli sineklik montajı ne kadar sürer?',
        answer: 'Ölçüye göre atölyemizde hazırlanan menteşeli sinekliklerin yerinde montajı kanat başına yaklaşık 15-20 dakika sürer.',
    },
];

const features = [
    {
        code: '01',
        title: 'Kapı Tipi Pratik Açılım',
        description: 'Mıknatıslı tutucu ve ergonomik tutamak ile tek hareketle rahatça açılıp kapanır.',
    },
    {
        code: '02',
        title: 'Tam Geçiş Açıklığı',
        description: 'Alt eşik profili gerektirmediği için balkon ve teras çıkışlarında takılma yapmaz.',
    },
    {
        code: '03',
        title: 'Rijit Alüminyum Çerçeve',
        description: 'Köşe takozlarıyla güçlendirilmiş 17x25 mm veya kapı tipi geniş alüminyum profil.',
    },
    {
        code: '04',
        title: 'Çıkarılabilir Menteşe',
        description: 'Temizlik veya kış mevsiminde kolayca sökülüp takılabilen geçmeli menteşe yapısı.',
    },
    {
        code: '05',
        title: 'Yaylı Otomatik Kapanma',
        description: 'Balkon kapılarında açık unutulmayı önleyen opsiyonel yaylı menteşe mekanizması.',
    },
    {
        code: '06',
        title: 'Ekonomik & Uzun Ömürlü',
        description: 'Basit mekanik yapısı sayesinde arıza yapmaz, yıllar sonra bile sadece tül değişimiyle yenilenir.',
    },
];

const usageAreas = [
    { title: 'Balkon Kapıları', description: 'Yoğun kullanılan balkon çıkışlarında tam geçiş kolaylığı.' },
    { title: 'Bahçe & Veranda', description: 'Müstakil ev ve bahçe katı kapılarında sağlam koruma.' },
    { title: 'Mutfak Pencereleri', description: 'Sürekli havalandırma gerektiren mutfak doğramaları.' },
    { title: 'Teras Çıkışları', description: 'Ortadan kayıtlı sağlam alüminyum kapı kasası uygulamaları.' },
];

export default function MenteseliSineklikPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200/80">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Sineklik', href: '/sineklik' },
                            { label: 'Menteşeli Sineklik' },
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
                                Klasik Alüminyum Sistem
                            </span>
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Menteşeli{' '}
                                <span className="text-[var(--primary)]">Sineklik</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                                Kapı ve pencere tipi açılım ile balkon çıkışlarınız için uzun ömürlü,
                                kolay temizlenebilir ve ekonomik alüminyum sineklik sistemi.
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
                                    href={getWhatsAppUrl('Merhaba, menteşeli sineklik için ölçü ve fiyat bilgisi almak istiyorum.')}
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
                                    alt="Menteşeli Sineklik Sistemleri - Ata Yapı"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#0b0f19]/85 backdrop-blur-md border border-white/10 text-xs">
                                    <span className="text-slate-300 font-medium">Mıknatıslı & Yaylı Opsiyon</span>
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
                            Menteşeli Sineklik Nedir?
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
                            <p>
                                Menteşeli sineklik, elektrostatik boyalı alüminyum profillerin gerdirilmiş fiberglass
                                tül ile birleştirildiği ve doğramaya menteşelerle bağlandığı klasik sineklik modelidir.
                                Mekanik parça karmaşası olmadığı için arıza riski en düşük sistemdir.
                            </p>
                            <p>
                                Kapı uygulamalarında kanadın esnemesini önleyen orta destek kaydı ve mıknatıslı
                                karşılık standart olarak uygulanır. Doğrama renginize uygun beyaz, antrasit veya
                                ahşap desenli profillerle üretilir.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200/80">
                            {['Orta Kayıt Destekli Kapı Tipi', 'Sökülüp Yıkanabilir Kanat', 'Mıknatıslı Kilit Karşılığı'].map((item) => (
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
                            Menteşeli Sineklik Avantajları
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

            {/* Usage Areas */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <div className="max-w-2xl mb-10">
                        <span className="section-eyebrow">Uygulama Alanları</span>
                        <h2
                            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Menteşeli Sineklik Nerelerde Kullanılır?
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {usageAreas.map((area) => (
                            <div key={area.title} className="p-6 bg-slate-50 rounded-2xl border border-slate-200/70">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[var(--primary)] mb-4">
                                    <BuildingIcon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{area.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Menteşeli Sineklik Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

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
                title="Balkon Kapınız İçin Menteşeli Sineklik"
                description="Özel ölçü üretim ve hızlı montaj için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
