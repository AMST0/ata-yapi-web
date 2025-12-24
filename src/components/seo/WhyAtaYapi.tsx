/**
 * "Neden Ata Yapı?" trust-building content block
 * Reusable across district and service pages
 */
export default function WhyAtaYapi() {
    const reasons = [
        {
            icon: '🏆',
            title: '10+ Yıl Deneyim',
            description: 'Maltepe ve çevresinde binlerce başarılı proje tamamladık.',
        },
        {
            icon: '✅',
            title: '2 Yıl Garanti',
            description: 'Tüm montaj ve malzemelerimize 2 yıl tam garanti veriyoruz.',
        },
        {
            icon: '📏',
            title: 'Ölçüye Özel Üretim',
            description: 'Her proje için birebir ölçüm yaparak özel üretim gerçekleştiriyoruz.',
        },
        {
            icon: '👷',
            title: 'Profesyonel Ekip',
            description: 'Deneyimli montaj ekibimiz ile hızlı ve temiz iş garantisi.',
        },
        {
            icon: '💳',
            title: 'Uygun Ödeme',
            description: 'Kredi kartına taksit ve elden taksit seçenekleri sunuyoruz.',
        },
        {
            icon: '🚗',
            title: 'Ücretsiz Keşif',
            description: 'Adresinize gelir, ölçüm yapar ve size özel teklif hazırlarız.',
        },
    ];

    return (
        <section className="py-16 lg:py-20 bg-gray-50">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Neden <span className="text-[var(--primary)]">Ata Yapı</span>?
                    </h2>
                    <p className="text-gray-600">
                        Kalite, güven ve müşteri memnuniyeti odaklı hizmet anlayışımızla fark yaratıyoruz.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        >
                            <div className="text-3xl mb-3">{reason.icon}</div>
                            <h3
                                className="font-bold text-gray-900 mb-2"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {reason.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
