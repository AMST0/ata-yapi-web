interface PricingExplainerProps {
    customNote?: string;
}

/**
 * "Why prices vary by measurement" explainer block
 * Helps set realistic expectations without showing fixed prices
 */
export default function PricingExplainer({ customNote }: PricingExplainerProps) {
    const defaultNote = `Fiyatlar proje ölçülerine, seçilen malzeme kalitesine ve sisteme göre değişiklik gösterir. 
    Net fiyat için mutlaka yerinde ölçüm yapılması gerekmektedir. 
    Ücretsiz keşif hizmetimiz ile size özel fiyat teklifi sunuyoruz.`;

    return (
        <section className="py-12 bg-amber-50 border-y border-amber-100">
            <div className="container">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-amber-100 rounded-xl">
                            <svg
                                className="w-6 h-6 text-amber-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3
                                className="font-bold text-gray-900 mb-2"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Fiyatlar Neden Ölçüye Göre Değişir?
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {customNote || defaultNote}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
