import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Motorlu Tente Sistemleri | Ata Yapı',
    description:
        'Motorlu tente sistemleri ile uzaktan kumanda kontrolü. Akıllı sensörler, otomatik kapanma. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/tente/motorlu',
    },
};

const faqs = [
    {
        question: 'Motorlu tente nasıl çalışır?',
        answer: 'Motorlu tente elektrik motoru ile çalışır. Uzaktan kumanda, duvara monte şalter veya akıllı telefon uygulaması ile kontrol edilir.',
    },
    {
        question: 'Motorlu tente fiyatları ne kadar?',
        answer: 'Motorlu tente sistemleri manuel sisteme göre %30-40 daha pahalıdır. Motor ve sensör maliyetleri dahil fiyatlar 6.000 TL\'den başlar.',
    },
    {
        question: 'Motorlu tenteye sensör eklenebilir mi?',
        answer: 'Evet, rüzgar sensörü ve güneş sensörü eklenebilir. Rüzgar sensörü kuvvetli rüzgarda tenteyi otomatik kapatır.',
    },
    {
        question: 'Motorlu tente elektrik kesilince ne olur?',
        answer: 'Elektrik kesintisinde manuel override sistemi ile tente elle açılıp kapatılabilir. Bazı modellerde pil destekli motor mevcuttur.',
    },
    {
        question: 'Motorlu tente akıllı ev sistemlerine bağlanır mı?',
        answer: 'Evet, uyumlu motorlar WiFi modülü ile akıllı ev sistemlerine entegre edilebilir. Google Home, Alexa gibi asistanlarla kontrol edilebilir.',
    },
    {
        question: 'Motorlu tente garanti süresi ne kadar?',
        answer: 'Motor üreticisine göre 2-5 yıl motor garantisi sunulmaktadır. Somfy ve Becker gibi markalar 5 yıl garanti verir.',
    },
];

const features = [
    { title: 'Uzaktan Kumanda', description: 'Tek tuşla açılış-kapanış kolaylığı.', icon: '📱' },
    { title: 'Akıllı Sensörler', description: 'Rüzgar ve güneş sensörleri ile otomatik kontrol.', icon: '🌡️' },
    { title: 'Sessiz Çalışma', description: 'Kaliteli motorlar ile sessiz ve yumuşak hareket.', icon: '🔇' },
    { title: 'Akıllı Ev Uyumu', description: 'WiFi ile akıllı ev sistemlerine entegrasyon.', icon: '🏠' },
    { title: 'Uzun Ömür', description: 'Mekanik yıpranma yok, uzun motor ömrü.', icon: '⏳' },
    { title: 'Konfor', description: 'Yerinden kalkmadan tente kontrolü.', icon: '✨' },
];

const brands = ['Somfy', 'Becker', 'Dooya', 'Elero', 'Nice'];

export default function MotorluTentePage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
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
            <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Akıllı Çözüm
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Motorlu{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)]">
                                Tente
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Uzaktan kumanda ile kontrol edilen akıllı tente sistemi. Rüzgar ve
                            güneş sensörleri ile otomatik açılış-kapanış. Akıllı eve entegrasyon.
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
                            Motorlu Tente Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Motorlu tente, elektrik motoru ile çalışan ve uzaktan kumanda veya
                                şalter ile kontrol edilen tente sistemidir. Elle döndürme gerektirmez,
                                tek tuşla açılır ve kapanır.
                            </p>
                            <p>
                                Modern motorlu tenteler akıllı sensörlerle donatılabilir. Rüzgar sensörü
                                kuvvetli rüzgarda tenteyi otomatik kapatarak hasar riskini önler.
                                Güneş sensörü ise belirli bir ışık yoğunluğunda tenteyi otomatik açar.
                            </p>
                            <p>
                                WiFi özellikli motorlar sayesinde akıllı telefon uygulaması ile
                                ev dışından bile tente kontrol edilebilir. Google Home, Amazon Alexa
                                gibi asistanlarla sesli komut desteği mümkündür.
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
                        Motorlu Tente Avantajları
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

            {/* Sensors */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Akıllı Sensör Seçenekleri
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <div className="text-4xl mb-4">💨</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Rüzgar Sensörü</h3>
                            <p className="text-gray-600 mb-4">
                                Belirli bir rüzgar hızının üzerinde otomatik olarak tenteyi kapatır.
                                Tente kumaşının ve mekanizmanın zarar görmesini önler.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Otomatik kapanma
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Ayarlanabilir hassasiyet
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Kablosuz iletişim
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <div className="text-4xl mb-4">☀️</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Güneş Sensörü</h3>
                            <p className="text-gray-600 mb-4">
                                Güneş ışığı yoğunluğuna göre tenteyi otomatik açar veya kapatır.
                                Eve gelmeden önce gölgelendirme sağlar.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Otomatik açılma
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Enerji tasarrufu
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[var(--accent)]">✓</span> Konfor artışı
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <h3 className="text-center text-gray-500 mb-6">Kullandığımız Motor Markaları</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {brands.map((brand) => (
                            <div
                                key={brand}
                                className="px-6 py-3 bg-white rounded-lg border border-gray-200 text-gray-700 font-medium"
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
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Tente Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/tente/kasetli"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Kasetli Tente
                        </Link>
                        <Link
                            href="/tente/mafsalli"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Mafsallı Tente
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
                title="Motorlu Tente Yaptırmak İster misiniz?"
                description="Akıllı tente sistemi için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
