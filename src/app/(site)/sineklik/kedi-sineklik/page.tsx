import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Kedi Sinekliği Sistemleri | Ata Yapı - Güçlendirilmiş File',
    description:
        'Kedi sinekliği ile evcil hayvanlarınızı koruyun. Güçlendirilmiş file, yırtılmaz yapı. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/sineklik/kedi-sineklik',
    },
};

const faqs = [
    {
        question: 'Kedi sinekliği normal sineklikten farkı nedir?',
        answer: 'Kedi sinekliği özel güçlendirilmiş fiberglass veya metal file kullanır. Kedilerin tırmalamaya ve atlamaya karşı dayanıklıdır. Normal sinekliklere göre 3-5 kat daha dayanıklıdır.',
    },
    {
        question: 'Kedi sinekliği kedimin güvenliğini sağlar mı?',
        answer: 'Evet, kedi sinekliği kedilerin pencereden düşmesini önler ve güvenli bir ortam sağlar. Özellikle yüksek katlarda yaşayan kedi sahipleri için şiddetle tavsiye edilir.',
    },
    {
        question: 'Kedi sinekliği fiyatları ne kadar?',
        answer: 'Kedi sinekliği normal sinekliğe göre %30-50 daha pahalıdır. File kalitesine göre pencere başına 1.000-2.000 TL arasında değişir.',
    },
    {
        question: 'Kedi file mi metal file mi tercih etmeliyim?',
        answer: 'Aktif ve büyük kediler için metal file önerilir. Sakin kediler ve küçük kedi yavruları için güçlendirilmiş fiberglass file yeterlidir.',
    },
    {
        question: 'Kedi sinekliği temizliği zor mu?',
        answer: 'Hayır, normal sineklik gibi kolayca temizlenir. Nemli bezle silmek veya hafif su sıkmak yeterlidir.',
    },
    {
        question: 'Mevcut sinekliğime kedi filesi takılabilir mi?',
        answer: 'Genellikle file değişimi yapılarak mevcut çerçeve kullanılabilir. Ancak çerçeve yapısına göre komple değişim gerekebilir.',
    },
];

const features = [
    { title: 'Güçlendirilmiş File', description: 'Normal fileye göre 3-5 kat daha dayanıklı.', icon: '💪' },
    { title: 'Düşme Önleme', description: 'Kedilerin pencereden düşmesini engeller.', icon: '🐱' },
    { title: 'Tırmalama Dayanımı', description: 'Kedilerin tırmalamasına karşı yırtılmaz.', icon: '🔒' },
    { title: 'UV Dayanımı', description: 'Güneş ışığında solmaz ve yıpranmaz.', icon: '☀️' },
    { title: 'Kolay Temizlik', description: 'Normal sineklik gibi kolayca temizlenir.', icon: '🧹' },
    { title: 'Hava Geçirgenliği', description: 'Temiz hava sirkülasyonu sağlar.', icon: '🌬️' },
];

export default function KediSineklikPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
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
            <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Evcil Hayvan Güvenliği
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Kedi{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)]">
                                Sinekliği
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Kedinizin güvenliği için özel tasarlanmış güçlendirilmiş sineklik sistemi.
                            Tırmalama ve atlama dayanımlı file ile pencereden düşme riskini ortadan kaldırın.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                            >
                                Ücretsiz Keşif
                            </Link>
                            <a
                                href="https://wa.me/905314002959"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alert */}
            <section className="py-8 bg-amber-50 border-b border-amber-100">
                <div className="container">
                    <div className="flex items-start gap-4 max-w-3xl mx-auto">
                        <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-amber-100 rounded-xl text-2xl">
                            ⚠️
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Önemli Uyarı</h3>
                            <p className="text-gray-700">
                                Yüksek katlarda yaşıyorsanız ve kediniz varsa, mutlaka kedi sinekliği yaptırmanızı
                                öneriyoruz. Her yıl binlerce kedi &quot;yüksekten düşme sendromu&quot; nedeniyle yaralanmaktadır.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2
                            className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Kedi Sinekliği Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Kedi sinekliği, evcil hayvan sahipleri için özel olarak tasarlanmış
                                güçlendirilmiş sineklik sistemidir. Normal sinekliklere göre çok daha
                                dayanıklı file kullanılır.
                            </p>
                            <p>
                                İki ana tip kedi sinekliği mevcuttur: Güçlendirilmiş fiberglass file ve
                                paslanmaz çelik (metal) file. Metal file en yüksek dayanımı sunarken,
                                güçlendirilmiş fiberglass daha ekonomik bir alternatiftir.
                            </p>
                            <p>
                                Kedi sinekliği sadece kedileri korumakla kalmaz, aynı zamanda normal
                                sineklik işlevini de görür ve haşerelere karşı koruma sağlar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Kedi Sinekliği Özellikleri
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                            >
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3
                                    className="font-bold text-gray-900 mb-2"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* File Types */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Kedi Sinekliği File Tipleri
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Güçlendirilmiş Fiberglass</h3>
                            <p className="text-gray-600 mb-4">
                                Normal fiberglass fileye göre 3 kat daha kalın ve dayanıklı. Orta aktiflikte kediler için uygundur.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Ekonomik fiyat
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Hafif yapı
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> İyi hava geçirgenliği
                                </li>
                            </ul>
                        </div>
                        <div className="bg-[var(--primary)]/5 rounded-2xl p-6 border border-[var(--primary)]/20">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Paslanmaz Çelik (Metal) File</h3>
                            <p className="text-gray-600 mb-4">
                                En yüksek dayanım. Aktif ve büyük kediler için önerilir. Yırtılma ihtimali yoktur.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Maksimum dayanım
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Yırtılmaz yapı
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Uzun ömür (10+ yıl)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Kedi Sinekliği Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Sineklik Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/sineklik/pileli"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Pileli Sineklik
                        </Link>
                        <Link
                            href="/sineklik/menteseli"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Menteşeli Sineklik
                        </Link>
                        <Link
                            href="/sineklik"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Tüm Sineklik Sistemleri →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTABlock
                title="Kediniz İçin Güvenli Sineklik İster misiniz?"
                description="Evcil hayvan güvenliği için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
