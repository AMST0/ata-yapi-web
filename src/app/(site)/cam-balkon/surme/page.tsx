import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Sürme Cam Balkon Sistemleri | Ata Yapı',
    description:
        'Sürme cam balkon sistemleri ile ekonomik ve pratik çözüm. Ray üzerinde kayan paneller, kolay kullanım. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/cam-balkon/surme',
    },
};

const faqs = [
    {
        question: 'Sürme cam balkon sistemi nasıl çalışır?',
        answer: 'Sürme cam balkon sisteminde cam paneller alt ve üst ray üzerinde kayarak hareket eder. Paneller birbirine bindirilerek veya yan yana getirilerek açılıp kapatılır.',
    },
    {
        question: 'Sürme cam balkon fiyatları ne kadar?',
        answer: 'Sürme cam balkon fiyatları balkon ölçülerine ve cam kalitesine göre değişir. Katlanır sisteme göre daha ekonomik olan sürme sistem, ortalama bir balkon için 12.000 TL\'den başlayan fiyatlarla sunulmaktadır.',
    },
    {
        question: 'Sürme cam balkon rüzgarda ses yapar mı?',
        answer: 'Kaliteli profiller ve doğru montaj ile sürme cam balkon sistemleri sessiz çalışır. Fırça contalar sayesinde rüzgar sızıntısı ve ses oluşumu minimize edilir.',
    },
    {
        question: 'Sürme cam balkon kaç panelden oluşur?',
        answer: 'Panel sayısı balkon genişliğine göre belirlenir. Genellikle 50-90 cm genişliğinde paneller kullanılır. Ortalama bir balkon 4-6 panel ile kapatılır.',
    },
    {
        question: 'Sürme cam balkonun bakımı nasıl yapılır?',
        answer: 'Rayların düzenli temizlenmesi ve yağlanması gerekir. Camlar normal cam temizleyici ile silinir. Yılda 1-2 kez ray bakımı yeterlidir.',
    },
    {
        question: 'Sürme cam balkon tamamen açılır mı?',
        answer: 'Sürme sistemlerde paneller üst üste bindirilerek açılır. Genellikle balkonun %70-80\'i açılabilir, panellerin birleştiği tarafta kapalı alan kalır.',
    },
];

const features = [
    { title: 'Ekonomik Fiyat', description: 'Katlanır sisteme göre daha uygun fiyatlı çözüm.', icon: '💰' },
    { title: 'Kolay Kullanım', description: 'Raylar üzerinde hafif ve sessiz kayış.', icon: '👆' },
    { title: 'Hızlı Montaj', description: 'Standart balkonlarda 1 günde montaj.', icon: '⚡' },
    { title: 'Düşük Bakım', description: 'Minimal bakım gereksinimi, uzun ömürlü kullanım.', icon: '🔧' },
    { title: 'Sağlam Yapı', description: 'Dayanıklı alüminyum profiller ve temperli cam.', icon: '💪' },
    { title: 'Modern Tasarım', description: 'İnce profiller ile şık ve modern görünüm.', icon: '✨' },
];

export default function SurmeCamBalkonPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Cam Balkon', href: '/cam-balkon' },
                            { label: 'Sürme Sistem' },
                        ]}
                    />
                </div>
            </div>

            {/* Hero */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
                        alt="Sürme Cam Balkon"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            Ekonomik Çözüm
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Sürme{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Cam Balkon
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Ray üzerinde kayan cam paneller ile ekonomik ve pratik çözüm.
                            Yeni siteler ve modern binalar için ideal. Kolay kullanım,
                            hızlı montaj ve uygun fiyat avantajı.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                Ücretsiz Keşif
                            </Link>
                            <Link
                                href="/#hesaplayici"
                                className="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-sm border border-white/20 transition-all duration-300"
                            >
                                Fiyat Hesapla
                            </Link>
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
                            Sürme Cam Balkon Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Sürme cam balkon sistemleri, cam panellerin alt ve üst ray üzerinde
                                yatay olarak kayarak hareket ettiği ekonomik cam balkon çözümüdür.
                                Cam paneller birbirine bindirilerek açılır ve kapatılır.
                            </p>
                            <p>
                                Özellikle yeni yapılan sitelerde ve modern apartmanlarda tercih edilen
                                sürme sistem, uygun fiyatı ve pratik kullanımı ile öne çıkar.
                                Katlanır sisteme göre daha az hareketli parça içerdiğinden bakım
                                maliyetleri de düşüktür.
                            </p>
                            <p>
                                Sürme cam balkon sistemlerinde genellikle 8 mm temperli cam kullanılır.
                                İsteğe bağlı olarak ısı camlı (çift cam) seçeneği de mevcuttur.
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
                        Sürme Cam Balkon Avantajları
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
                            Sürme Sistem Nasıl Çalışır?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-2xl">
                                    1
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Raylar</h3>
                                <p className="text-gray-600 text-sm">
                                    Alt ve üst raylar balkon kenarına monte edilir. Cam paneller bu raylar üzerinde hareket eder.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-2xl">
                                    2
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Kayış</h3>
                                <p className="text-gray-600 text-sm">
                                    Cam paneller parmak ucu ile hafifçe itilerek ray üzerinde kayar.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-2xl">
                                    3
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Bindirme</h3>
                                <p className="text-gray-600 text-sm">
                                    Açık konumda paneller üst üste biner, kapalı konumda yan yana gelir.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Sürme Cam Balkon Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Cam Balkon Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/cam-balkon/isi-camli"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Isı Camlı Sistem
                        </Link>
                        <Link
                            href="/cam-balkon/katlanir"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Katlanır Cam Balkon
                        </Link>
                        <Link
                            href="/cam-balkon"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Tüm Cam Balkon Sistemleri →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTABlock
                title="Sürme Cam Balkon Yaptırmak İster misiniz?"
                description="Ekonomik çözüm için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
