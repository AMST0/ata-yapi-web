/**
 * "Ücretsiz keşif nasıl işliyor?" explainer block
 */
export default function FreeInspection() {
    const steps = [
        {
            step: 1,
            title: 'Randevu Alın',
            description: 'Telefon, WhatsApp veya web formu ile bize ulaşın.',
        },
        {
            step: 2,
            title: 'Keşif Ziyareti',
            description: 'Uzman ekibimiz adresinize gelir ve ölçüm yapar.',
        },
        {
            step: 3,
            title: 'Teklif',
            description: 'Size özel detaylı fiyat teklifi hazırlarız.',
        },
        {
            step: 4,
            title: 'Montaj',
            description: 'Onayınız sonrası üretim ve montaj başlar.',
        },
    ];

    return (
        <section className="py-16 lg:py-20 bg-white">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Ücretsiz Keşif Nasıl İşliyor?
                    </h2>
                    <p className="text-gray-600">
                        4 basit adımda balkonunuzu dönüştürün.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {steps.map((item) => (
                        <div key={item.step} className="text-center relative">
                            {/* Connector line */}
                            {item.step < 4 && (
                                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                            )}

                            {/* Step number */}
                            <div className="relative z-10 w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center text-white text-xl font-bold">
                                {item.step}
                            </div>

                            <h3
                                className="font-bold text-gray-900 mb-2"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
