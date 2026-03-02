import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/seo/FAQSection';
import CTABlock from '@/components/seo/CTABlock';
import WhyAtaYapi from '@/components/seo/WhyAtaYapi';

export const metadata: Metadata = {
    title: 'Katlanır Cam Balkon Sistemleri | Ata Yapı',
    description:
        'Katlanır cam balkon sistemleri ile %100 açılım imkanı. Esnek kullanım, şık tasarım. Maltepe ve çevresinde ücretsiz keşif.',
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/cam-balkon/katlanir',
    },
};

const faqs = [
    {
        question: 'Katlanır cam balkon nasıl çalışır?',
        answer: 'Katlanır cam balkon sisteminde cam paneller menteşelerle birbirine bağlıdır. Açma sırasında paneller akordiyon gibi katlanarak bir tarafa toplanır ve balkonun tamamı açılır.',
    },
    {
        question: 'Katlanır cam balkon tamamen açılır mı?',
        answer: 'Evet, katlanır cam balkon sistemleri %100 açılım imkanı sunar. Tüm paneller bir tarafa katlanarak toplanır ve balkon tamamen açık hale gelir.',
    },
    {
        question: 'Katlanır cam balkon fiyatları ne kadar?',
        answer: 'Katlanır sistem sürme sisteme göre daha yüksek fiyatlıdır. Ortalama bir balkon için fiyatlar 18.000 TL\'den başlar. Kesin fiyat için ücretsiz keşif randevusu alabilirsiniz.',
    },
    {
        question: 'Katlanır cam balkon ne kadar sürede monte edilir?',
        answer: 'Standart bir balkon için montaj 1-2 gün içinde tamamlanır. Üretim süresi dahil toplam süreç yaklaşık 1 hafta sürer.',
    },
    {
        question: 'Katlanır cam balkon rüzgara dayanıklı mı?',
        answer: 'Evet, katlanır cam balkon sistemleri rüzgara dayanıklıdır. Özel kilitleme mekanizması sayesinde kapalı konumda güvenli şekilde sabitlenir.',
    },
    {
        question: 'Katlanır cam balkon hangi balkonlara uygun?',
        answer: 'Katlanır sistem her boyuttaki balkona uygulanabilir. Özellikle manzaralı balkonlar, geniş teraslar ve açık kullanım istenen alanlar için idealdir.',
    },
];

const features = [
    { title: '%100 Açılım', description: 'Tüm paneller katlanarak balkonunuzu tamamen açın.', icon: '🚪' },
    { title: 'Esnek Kullanım', description: 'Dilediğiniz kadar açıp kapatabilme imkanı.', icon: '🔄' },
    { title: 'Manzara Keyfi', description: 'Açık konumda kesintisiz manzara deneyimi.', icon: '🏞️' },
    { title: 'Şık Tasarım', description: 'Modern ve estetik görünüm.', icon: '✨' },
    { title: 'Kolay Kullanım', description: 'Tek elle açılıp kapatılır.', icon: '👆' },
    { title: 'Güvenli Kilit', description: 'Özel kilitleme sistemi ile güvenlik.', icon: '🔒' },
];

export default function KatlanirCamBalkonPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="container">
                    <Breadcrumb
                        items={[
                            { label: 'Ana Sayfa', href: '/' },
                            { label: 'Cam Balkon', href: '/cam-balkon' },
                            { label: 'Katlanır Sistem' },
                        ]}
                    />
                </div>
            </div>

            {/* Hero */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                        alt="Katlanır Cam Balkon"
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
                            En Popüler Sistem
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Katlanır{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Cam Balkon
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Cam panellerin tamamen katlanarak toplandığı esnek sistem.
                            Balkonunuzu istediğinizde %100 açık hale getirin. Manzaralı
                            balkonlar için ideal çözüm.
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
                            Katlanır Cam Balkon Nedir?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p>
                                Katlanır cam balkon sistemleri, cam panellerin menteşelerle birbirine
                                bağlı olduğu ve akordiyon tarzı katlanan cam balkon çözümüdür. En büyük
                                avantajı balkonun %100 açılabilmesidir.
                            </p>
                            <p>
                                Özellikle deniz manzaralı balkonlarda, geniş teraslarda ve açık hava
                                keyfi istenilen alanlarda tercih edilen katlanır sistem, balkonunuzu
                                yazın tamamen açık, kışın tamamen kapalı kullanmanıza olanak tanır.
                            </p>
                            <p>
                                Katlanır sistemde genellikle 8 mm temperli cam kullanılır. Paneller
                                tek elle kolayca açılıp kapatılabilir ve özel kilitleme sistemi ile
                                güvenli şekilde sabitlenir.
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
                        Katlanır Cam Balkon Avantajları
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

            {/* Comparison */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="container">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Katlanır vs Sürme Sistem Karşılaştırma
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-4 text-left font-semibold text-gray-900">Özellik</th>
                                        <th className="p-4 text-center font-semibold text-gray-900 bg-[var(--primary)]/10">Katlanır</th>
                                        <th className="p-4 text-center font-semibold text-gray-900">Sürme</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="p-4 text-gray-700">Açılım Oranı</td>
                                        <td className="p-4 text-center font-medium text-[var(--accent)] bg-[var(--primary)]/5">%100</td>
                                        <td className="p-4 text-center text-gray-500">%70-80</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-gray-700">Kullanım Kolaylığı</td>
                                        <td className="p-4 text-center font-medium text-[var(--accent)] bg-[var(--primary)]/5">Çok Kolay</td>
                                        <td className="p-4 text-center text-gray-500">Kolay</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-gray-700">Manzara Keyfi</td>
                                        <td className="p-4 text-center font-medium text-[var(--accent)] bg-[var(--primary)]/5">Mükemmel</td>
                                        <td className="p-4 text-center text-gray-500">İyi</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-gray-700">Fiyat</td>
                                        <td className="p-4 text-center text-gray-700 bg-[var(--primary)]/5">Premium</td>
                                        <td className="p-4 text-center text-gray-500">Ekonomik</td>
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
            <FAQSection title="Katlanır Cam Balkon Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

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
                            href="/cam-balkon/surme"
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                            Sürme Cam Balkon
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
                title="Katlanır Cam Balkon Yaptırmak İster misiniz?"
                description="%100 açılım ve manzara keyfi için ücretsiz keşif randevusu alın."
            />
        </>
    );
}
