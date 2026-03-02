import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Mafsallı Tente Sistemleri | Ata Yapı',
    description:
        'Mafsallı tente sistemleri ile ekonomik gölgelik çözümü. Kolay kullanım, geniş renk seçeneği. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/tente/mafsalli',
    },
};

const faqs = [
    {
        question: 'Mafsallı tente nedir?',
        answer: 'Mafsallı tente, iki adet kol (mafsal) mekanizması ile açılıp kapanan geleneksel tente sistemidir. Balkon ve teraslar için en çok tercih edilen modeldir.',
    },
    {
        question: 'Mafsallı tente fiyatları ne kadar?',
        answer: 'Mafsallı tente fiyatları boyuta ve kumaş kalitesine göre değişir. Ortalama bir balkon için fiyatlar 4.000 TL\'den başlar.',
    },
    {
        question: 'Mafsallı tente manuel mi motorlu mu?',
        answer: 'Mafsallı tenteler hem manuel (elle krank ile) hem de motorlu olarak üretilebilir. Manuel sistem daha ekonomik, motorlu sistem daha pratiktir.',
    },
    {
        question: 'Mafsallı tente ne kadar açılır?',
        answer: 'Standart mafsallı tenteler 2-3.5 metre arasında öne doğru açılabilir. Özel üretim ile 4 metreye kadar açılım sağlanabilir.',
    },
    {
        question: 'Mafsallı tente rüzgarda dayanır mı?',
        answer: 'Orta şiddette rüzgarda sorun olmaz. Kuvvetli rüzgarda tente kapatılmalıdır. Motorlu sistemlere rüzgar sensörü eklenerek otomatik kapanma sağlanabilir.',
    },
    {
        question: 'Mafsallı tente bakımı nasıl yapılır?',
        answer: 'Yılda 1-2 kez kumaş yıkanmalı, kol mekanizması yağlanmalıdır. Düzenli bakımla 10+ yıl sorunsuz kullanım sağlanır.',
    },
];

const features = [
    { title: 'Ekonomik Fiyat', description: 'Diğer sistemlere göre daha uygun fiyatlı.', icon: '💰' },
    { title: 'Kolay Kullanım', description: 'Elle krank veya motor ile kolay açılış.', icon: '👆' },
    { title: 'Geniş Renk Seçeneği', description: 'Düz ve desenli kumaş alternatifleri.', icon: '🎨' },
    { title: 'Hızlı Montaj', description: 'Genellikle yarım günde montaj tamamlanır.', icon: '⚡' },
    { title: 'Dayanıklı Yapı', description: 'Güçlü kol mekanizması ve sağlam kumaş.', icon: '💪' },
    { title: 'Modüler Yapı', description: 'İsteğe göre motor ve sensör eklenebilir.', icon: '🔧' },
];

export default function MafsalliTentePage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
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
                            Mafsallı{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)]">
                                Tente
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Kol mekanizması ile açılıp kapanan klasik tente sistemi. Ekonomik
                            fiyat, kolay kullanım ve geniş kumaş seçenekleri. Balkonlar için
                            en popüler tercih.
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
                            Mafsallı Tente Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Mafsallı tente, iki adet kol (mafsal) mekanizması ve yaylı kol sistemi ile
                                açılıp kapanan geleneksel tente modelidir. En yaygın kullanılan tente
                                tipi olup balkon, teras ve dükkan önlerinde sıklıkla tercih edilir.
                            </p>
                            <p>
                                Manuel versiyonlar elle döndürülen bir krank ile açılıp kapatılırken,
                                motorlu versiyonlar kumanda veya şalter ile kontrol edilir. Ekonomik
                                fiyatı ve kolay kullanımı ile öne çıkar.
                            </p>
                            <p>
                                Mafsallı tenteler 2-6 metre arası genişliklerde ve 2-3.5 metre arası
                                açılımlarda üretilebilir. Geniş kumaş renk ve desen seçenekleri mevcuttur.
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
                        Mafsallı Tente Avantajları
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

            {/* How it works */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2
                            className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Mafsallı Tente Nasıl Çalışır?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-2xl">
                                    1
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Kol Mekanizması</h3>
                                <p className="text-gray-600 text-sm">
                                    İki adet yaylı kol kumaşı gergin tutar ve açılış-kapanışı sağlar.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-2xl">
                                    2
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Mil (Boru)</h3>
                                <p className="text-gray-600 text-sm">
                                    Kumaş merkezi mile sarılır. Krank veya motor ile mil döndürülerek açılış yapılır.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-2xl">
                                    3
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Kumaş</h3>
                                <p className="text-gray-600 text-sm">
                                    UV dayanımlı akrilik veya polyester kumaş gölgelendirme sağlar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Mafsallı Tente Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

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
                title="Mafsallı Tente Yaptırmak İster misiniz?"
                description="Ekonomik tente çözümü için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
