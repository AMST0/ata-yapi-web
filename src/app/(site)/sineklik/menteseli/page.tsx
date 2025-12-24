import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Menteşeli Sineklik Sistemleri | Ata Yapı',
    description:
        'Menteşeli sineklik sistemleri ile kapı tipi açılım. Balkon kapıları için ideal çözüm. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.atayapi.site/sineklik/menteseli',
    },
};

const faqs = [
    {
        question: 'Menteşeli sineklik nedir?',
        answer: 'Menteşeli sineklik, metal veya plastik menteşeler ile çerçeveye bağlı, kapı gibi açılıp kapanan sineklik sistemidir. Genellikle balkon ve teras kapılarında kullanılır.',
    },
    {
        question: 'Menteşeli sineklik hangi alanlar için uygundur?',
        answer: 'Menteşeli sineklik özellikle balkon kapıları, teras çıkışları ve sık kullanılan kapılar için idealdir. Geniş geçiş alanı sağlar.',
    },
    {
        question: 'Menteşeli sineklik fiyatları ne kadar?',
        answer: 'Menteşeli sineklik fiyatları kapı boyutuna göre değişir. Standart bir balkon kapısı için 1.500-2.500 TL arasında değişmektedir.',
    },
    {
        question: 'Menteşeli sineklik kendiliğinden kapanır mı?',
        answer: 'Evet, menteşeli sinekliklere kapı kapatıcı (closer) mekanizması eklenebilir. Bu sayede kapı otomatik olarak kapanır.',
    },
    {
        question: 'Menteşeli sineklik mi plise sineklik mi tercih etmeliyim?',
        answer: 'Sık kullanılan kapılar için menteşeli sineklik, pencereler ve dar alanlar için plise sineklik daha uygundur.',
    },
    {
        question: 'Menteşeli sineklik montajı ne kadar sürer?',
        answer: 'Tek bir menteşeli sineklik montajı yaklaşık 30-45 dakika sürer.',
    },
];

const features = [
    { title: 'Kapı Tipi Açılım', description: 'Kapı gibi açılıp kapanan pratik sistem.', icon: '🚪' },
    { title: 'Geniş Geçiş', description: 'Rahat geçiş için tam açılım alanı.', icon: '↔️' },
    { title: 'Dayanıklı Yapı', description: 'Güçlü menteşeler ve sağlam çerçeve.', icon: '💪' },
    { title: 'Kolay Kullanım', description: 'Tek elle kolayca açılıp kapatılır.', icon: '👆' },
    { title: 'Kapı Kapatıcı', description: 'Otomatik kapanma mekanizması opsiyonu.', icon: '🔄' },
    { title: 'Ekonomik', description: 'Uygun fiyatlı ve uzun ömürlü.', icon: '💰' },
];

export default function MenteseliSineklikPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
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
            <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Klasik Çözüm
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Menteşeli{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)]">
                                Sineklik
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Kapı tipi açılım ile balkon ve teras kapılarınız için ideal sineklik çözümü.
                            Geniş geçiş alanı, dayanıklı yapı ve kolay kullanım.
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
                            Menteşeli Sineklik Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Menteşeli sineklik, metal menteşeler ile çerçeveye bağlanan ve kapı gibi
                                açılıp kapanan geleneksel sineklik sistemidir. En yaygın kullanılan
                                sineklik tiplerinden biridir.
                            </p>
                            <p>
                                Özellikle balkon kapıları, teras çıkışları ve mutfak kapıları için tercih edilir.
                                Tek veya çift kanatlı olarak üretilebilir. Kapı kapatıcı (closer) mekanizması
                                eklenerek otomatik kapanma sağlanabilir.
                            </p>
                            <p>
                                Alüminyum veya PVC çerçeve seçenekleri mevcuttur. Kapı doğramasına uygun
                                renk seçimi yapılabilir.
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
                        Menteşeli Sineklik Avantajları
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

            {/* Usage Areas */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Menteşeli Sineklik Nerelerde Kullanılır?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-4xl mb-3">🏠</div>
                            <h3 className="font-bold text-gray-900 mb-2">Balkon Kapıları</h3>
                            <p className="text-gray-600 text-sm">Balkon çıkışları için en çok tercih edilen sistem.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-4xl mb-3">🌳</div>
                            <h3 className="font-bold text-gray-900 mb-2">Bahçe Kapıları</h3>
                            <p className="text-gray-600 text-sm">Bahçeye açılan kapılar için dayanıklı çözüm.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-4xl mb-3">🍳</div>
                            <h3 className="font-bold text-gray-900 mb-2">Mutfak Kapıları</h3>
                            <p className="text-gray-600 text-sm">Mutfak havalandırması için pratik seçenek.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-4xl mb-3">☀️</div>
                            <h3 className="font-bold text-gray-900 mb-2">Teras Çıkışları</h3>
                            <p className="text-gray-600 text-sm">Geniş teraslara açılan çift kanatlı sistemler.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Menteşeli Sineklik Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

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
                            href="/sineklik/kedi-sineklik"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Kedi Sinekliği
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
                title="Menteşeli Sineklik Yaptırmak İster misiniz?"
                description="Balkon kapılarınız için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
