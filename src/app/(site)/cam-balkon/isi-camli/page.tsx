import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Isı Camlı Cam Balkon Sistemleri | Ata Yapı',
    description:
        'Isı camlı cam balkon sistemleri ile 4 mevsim konfor. Çift cam yalıtımı, enerji tasarrufu ve sessiz ortam. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.atayapi.site/cam-balkon/isi-camli',
    },
};

const faqs = [
    {
        question: 'Isı camlı cam balkon nedir?',
        answer: 'Isı camlı cam balkon, çift cam (double glazing) teknolojisi kullanılarak üretilen, üstün ısı ve ses yalıtımı sağlayan cam balkon sistemidir. İki cam arasındaki hava boşluğu veya argon gazı sayesinde ısı transferi minimize edilir.',
    },
    {
        question: 'Isı camlı sistem normal cam balkondan ne kadar pahalı?',
        answer: 'Isı camlı sistemler tek camlı sistemlere göre yaklaşık %40-60 daha yüksek fiyatlıdır. Ancak enerji tasarrufu düşünüldüğünde uzun vadede kendini amorti eder.',
    },
    {
        question: 'Isı camlı cam balkon enerji tasarrufu sağlar mı?',
        answer: 'Evet, ısı camlı sistemler kış aylarında ısı kaybını %40-50 oranında azaltır. Bu sayede ısıtma giderlerinizde önemli tasarruf sağlarsınız.',
    },
    {
        question: 'Isı camlı cam balkon ses yalıtımı sağlar mı?',
        answer: 'Evet, çift cam yapısı sayesinde dış ortam gürültüsünü %30-40 oranında azaltır. Özellikle ana yola bakan balkonlar için idealdir.',
    },
    {
        question: 'Çift cam arasında buğulanma olur mu?',
        answer: 'Kaliteli üretilmiş ısı camlarında buğulanma olmaz. Cam arası hava boşluğu fabrikada nem alınarak sızdırmaz şekilde kapatılır.',
    },
    {
        question: 'Isı camlı sistemlerin ömrü ne kadardır?',
        answer: 'Doğru montaj ve bakım ile ısı camlı sistemler 20-25 yıl sorunsuz kullanılabilir. Cam garantisi 10 yıldır.',
    },
];

const benefits = [
    { title: 'Üstün Isı Yalıtımı', description: 'Çift cam teknolojisi ile kış aylarında %40-50 ısı tasarrufu.', icon: '🌡️' },
    { title: 'Ses Yalıtımı', description: 'Dış gürültüyü %30-40 oranında azaltarak sessiz bir ortam.', icon: '🔇' },
    { title: 'Enerji Tasarrufu', description: 'Düşük ısıtma maliyetleri ile yatırımınızı geri kazanın.', icon: '💡' },
    { title: '4 Mevsim Konfor', description: 'Yazın serin, kışın sıcak balkon keyfi.', icon: '☀️' },
    { title: 'Buğulanma Yok', description: 'Özel üretim sayesinde cam arasında nem birikmez.', icon: '✨' },
    { title: '20+ Yıl Ömür', description: 'Uzun ömürlü, dayanıklı ve düşük bakımlı sistem.', icon: '⏳' },
];

export default function IsiCamliPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Cam Balkon', href: '/cam-balkon' },
                            { label: 'Isı Camlı Sistem' },
                        ]}
                    />
                </div>
            </div>

            {/* Hero */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                        alt="Isı Camlı Cam Balkon"
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
                            Premium Sistem
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Isı Camlı{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Cam Balkon
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Çift cam teknolojisi ile üstün ısı ve ses yalıtımı. Balkonunuzu 4 mevsim
                            konforlu bir yaşam alanına dönüştürün. Enerji tasarrufu yapın, sessiz bir
                            ortamın keyfini çıkarın.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
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
                            Isı Camlı Cam Balkon Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Isı camlı cam balkon sistemleri, çift cam (double glazing) teknolojisi
                                kullanılarak üretilen premium cam balkon çözümleridir. İki adet temperli
                                cam arasında 12-16 mm hava boşluğu veya argon gazı bulunur. Bu yapı
                                sayesinde ısı transferi minimuma indirilir ve üstün yalıtım sağlanır.
                            </p>
                            <p>
                                Özellikle kuzey cephelerde, rüzgara açık bölgelerde ve gürültülü
                                caddelere bakan balkonlarda ısı camlı sistem tercih edilmelidir.
                                Kış aylarında balkonunuzun sıcaklığı dış ortama göre 15-20 derece
                                daha yüksek olabilir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Isı Camlı Sistemin Avantajları
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                            >
                                <div className="text-3xl mb-3">{benefit.icon}</div>
                                <h3
                                    className="font-bold text-gray-900 mb-2"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Tek Cam vs Isı Camlı Karşılaştırma
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-4 text-left font-semibold text-gray-900">Özellik</th>
                                        <th className="p-4 text-center font-semibold text-gray-900">Tek Cam</th>
                                        <th className="p-4 text-center font-semibold text-gray-900 bg-[var(--primary)]/10">Isı Camlı</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="p-4 text-gray-700">Isı Yalıtımı</td>
                                        <td className="p-4 text-center text-gray-500">Düşük</td>
                                        <td className="p-4 text-center font-medium text-[var(--accent)] bg-[var(--primary)]/5">Yüksek</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-gray-700">Ses Yalıtımı</td>
                                        <td className="p-4 text-center text-gray-500">Orta</td>
                                        <td className="p-4 text-center font-medium text-[var(--accent)] bg-[var(--primary)]/5">Yüksek</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-gray-700">Enerji Tasarrufu</td>
                                        <td className="p-4 text-center text-gray-500">%10-15</td>
                                        <td className="p-4 text-center font-medium text-[var(--accent)] bg-[var(--primary)]/5">%40-50</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-gray-700">Kış Konforu</td>
                                        <td className="p-4 text-center text-gray-500">Orta</td>
                                        <td className="p-4 text-center font-medium text-[var(--accent)] bg-[var(--primary)]/5">Mükemmel</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-gray-700">Fiyat</td>
                                        <td className="p-4 text-center text-gray-500">Ekonomik</td>
                                        <td className="p-4 text-center font-medium text-gray-700 bg-[var(--primary)]/5">Premium</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Ata Yapı */}
            <WhyAtaYapi />

            {/* FAQ */}
            <FAQSection title="Isı Camlı Cam Balkon Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

            {/* Related Links */}
            <section className="py-12 bg-gray-50">
                <div className="container">
                    <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Diğer Cam Balkon Sistemleri
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/cam-balkon/surme"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Sürme Cam Balkon
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
                title="Isı Camlı Cam Balkon Yaptırmak İster misiniz?"
                description="Premium yalıtım ve konfor için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
