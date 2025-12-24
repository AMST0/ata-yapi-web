import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Pileli (Plise) Sineklik Sistemleri | Ata Yapı',
    description:
        'Pileli sineklik sistemleri ile modern ve şık çözüm. Akordiyon tarzı katlanan sineklik. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.atayapi.site/sineklik/pileli',
    },
};

const faqs = [
    {
        question: 'Pileli sineklik nedir?',
        answer: 'Pileli (plise) sineklik, akordiyon tarzı katlanan modern sineklik sistemidir. Kullanılmadığında minimal bir alana toplanır ve görünmez hale gelir.',
    },
    {
        question: 'Pileli sineklik fiyatları ne kadar?',
        answer: 'Pileli sineklik fiyatları pencere boyutuna göre değişir. Standart bir pencere için 800-1.500 TL arasında fiyatlarla sunulmaktadır.',
    },
    {
        question: 'Pileli sineklik temizliği nasıl yapılır?',
        answer: 'Pileli sineklik nemli bir bezle silinerek kolayca temizlenir. Kıvrımlara biriken toz hafif su sıkılarak temizlenir.',
    },
    {
        question: 'Pileli sineklik her pencereye uyar mı?',
        answer: 'Evet, pileli sineklik PVC, alüminyum ve ahşap pencere sistemlerine uygun şekilde monte edilebilir.',
    },
    {
        question: 'Pileli sineklik ne kadar dayanıklı?',
        answer: 'Kaliteli pileli sineklikler 5-8 yıl sorunsuz kullanım sağlar. Fiberglass file ve alüminyum profiller uzun ömürlüdür.',
    },
    {
        question: 'Pileli sineklik montajı ne kadar sürer?',
        answer: 'Standart bir evin tüm pencerelerine pileli sineklik montajı 2-4 saat arasında tamamlanır.',
    },
];

const features = [
    { title: 'Şık Tasarım', description: 'Modern ve estetik görünüm, minimal profil.', icon: '✨' },
    { title: 'Görünmez Toplama', description: 'Kullanılmadığında kıvrımlar toplanır ve görünmez olur.', icon: '👁️' },
    { title: 'Kolay Kullanım', description: 'Tek elle kolayca açılıp kapatılır.', icon: '👆' },
    { title: 'Sessiz Çalışma', description: 'Yumuşak hareket, gürültüsüz açılış-kapanış.', icon: '🔇' },
    { title: 'Uzun Ömür', description: 'Dayanıklı mekanizma, 5-8 yıl kullanım.', icon: '⏳' },
    { title: 'Çok Yönlü', description: 'Pencere, kapı ve dar alanlara uygulanabilir.', icon: '🔄' },
];

export default function PileliSineklikPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
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
            <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Modern Çözüm
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Pileli{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)]">
                                Sineklik
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Akordiyon tarzı katlanan modern sineklik sistemi. Kullanılmadığında
                            görünmez olur, şık tasarımı ile pencerenizin estetiğini bozmaz.
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
                            Pileli Sineklik Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Pileli sineklik (plise sineklik), akordiyon tarzı kıvrımlardan oluşan
                                modern bir sineklik sistemidir. File malzeme özel kıvrımlar halinde
                                katlanarak açılıp kapanır.
                            </p>
                            <p>
                                En büyük avantajı kullanılmadığında minimal bir alana toplanması ve
                                neredeyse görünmez hale gelmesidir. Bu özelliği ile özellikle modern
                                evlerde ve estetik kaygı taşıyan müşterilerimiz tarafından tercih edilir.
                            </p>
                            <p>
                                Pileli sineklik hem pencereler hem de kapılar için uygundur. Tek kanat
                                veya çift kanat olarak üretilebilir.
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
                        Pileli Sineklik Avantajları
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
            <FAQSection title="Pileli Sineklik Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Sineklik Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/sineklik/menteseli"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Menteşeli Sineklik
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
                title="Pileli Sineklik Yaptırmak İster misiniz?"
                description="Modern ve şık sineklik çözümü için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
