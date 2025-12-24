import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Kasetli Tente Sistemleri | Ata Yapı',
    description:
        'Kasetli tente sistemleri ile kumaş koruması ve uzun ömür. Premium kalite, modern tasarım. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.atayapi.site/tente/kasetli',
    },
};

const faqs = [
    {
        question: 'Kasetli tente nedir?',
        answer: 'Kasetli tente, kumaşın kapalı konumda bir kaset (kutu) içinde korunduğu premium tente sistemidir. Bu sayede kumaş güneş, yağmur ve tozdan korunur.',
    },
    {
        question: 'Kasetli tente mafsallı tenteden farkı nedir?',
        answer: 'Kasetli tentede kumaş kapalıyken tamamen kutu içinde kalır, mafsallı tentede ise kumaş açıkta durur. Bu nedenle kasetli tente daha uzun ömürlüdür.',
    },
    {
        question: 'Kasetli tente fiyatları ne kadar?',
        answer: 'Kasetli tente sistemleri mafsallı tentelerden %30-50 daha pahalıdır. Ortalama bir balkon için fiyatlar 8.000 TL\'den başlar.',
    },
    {
        question: 'Kasetli tente motorlu mu manuel mi?',
        answer: 'Kasetli tenteler genellikle motorlu sistemlerle birlikte sunulur. Manuel versiyon da mevcuttur ancak motorlu kullanım daha pratiktir.',
    },
    {
        question: 'Kasetli tentenin ömrü ne kadardır?',
        answer: 'Doğru bakımla kasetli tenteler 12-15 yıl sorunsuz kullanılabilir. Kumaş koruması sayesinde mafsallı tentelere göre daha uzun ömürlüdür.',
    },
    {
        question: 'Kasetli tente hangi genişliklerde yapılabilir?',
        answer: 'Kasetli tenteler 2 metreden 6 metreye kadar genişlikte üretilebilir. Daha geniş alanlar için özel çözümler sunulabilir.',
    },
];

const features = [
    { title: 'Kumaş Koruması', description: 'Kaset içinde kumaş güneş ve yağmurdan korunur.', icon: '🛡️' },
    { title: 'Uzun Ömür', description: 'Korunaklı yapı sayesinde 12-15 yıl kullanım.', icon: '⏳' },
    { title: 'Modern Tasarım', description: 'Şık kaset görünümü ile modern estetik.', icon: '✨' },
    { title: 'Motorlu Sistem', description: 'Uzaktan kumanda ile kolay kontrol.', icon: '📱' },
    { title: 'Düşük Bakım', description: 'Kumaş koruması sayesinde az bakım gereksinimi.', icon: '🔧' },
    { title: 'Premium Kalite', description: 'Üst segment malzeme ve işçilik.', icon: '👑' },
];

export default function KasetliTentePage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
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
            <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Premium Sistem
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Kasetli{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)]">
                                Tente
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Kumaşın kaset içinde korunduğu premium tente sistemi. Uzun ömür,
                            modern tasarım ve düşük bakım. Balkon ve teraslarınız için en iyi yatırım.
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

            {/* What is */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2
                            className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Kasetli Tente Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Kasetli tente, kumaşın kapalı konumda alüminyum veya plastik bir kaset
                                (kutu) içine tamamen gizlendiği üst segment tente sistemidir. Bu koruyucu
                                yapı sayesinde kumaş güneşin zararlı UV ışınlarından, yağmurdan ve tozdan korunur.
                            </p>
                            <p>
                                Mafsallı tentelere göre daha yüksek fiyatlı olmasına rağmen, uzun vadede
                                kumaş ömrü ve düşük bakım maliyetleri ile kendini amorti eder. Özellikle
                                kaliteli kumaş kullanan müşteriler için ideal bir seçimdir.
                            </p>
                            <p>
                                Kasetli tenteler genellikle motorlu sistemlerle birlikte sunulur ve
                                uzaktan kumanda ile kontrol edilir. Rüzgar ve güneş sensörleri eklenebilir.
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
                        Kasetli Tente Avantajları
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

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Kasetli Tente Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Tente Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/tente/mafsalli"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Mafsallı Tente
                        </Link>
                        <Link
                            href="/tente/motorlu"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Motorlu Tente
                        </Link>
                        <Link
                            href="/tente"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Tüm Tente Sistemleri →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTABlock
                title="Kasetli Tente Yaptırmak İster misiniz?"
                description="Premium tente sistemi için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
