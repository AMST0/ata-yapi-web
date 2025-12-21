const stats = [
    { value: "10+", label: "Yıllık Tecrübe" },
    { value: "500+", label: "Tamamlanan Proje" },
    { value: "2", label: "Yıl Garanti" },
    { value: "%100", label: "Müşteri Memnuniyeti" },
];

const features = [
    {
        title: "Ölçüye Özel Üretim",
        description: "Her proje için özel ölçülendirme ve üretim yapıyoruz.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
    },
    {
        title: "Profesyonel Montaj",
        description: "Uzman ekibimiz ile hızlı ve temiz montaj hizmeti.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        title: "Kaliteli Malzeme",
        description: "Avrupa standartlarında, dayanıklı ve estetik malzemeler.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
    },
    {
        title: "Garanti & Destek",
        description: "2 yıl garanti ve satış sonrası teknik destek hizmeti.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
];

export default function Trust() {
    return (
        <section className="py-20 lg:py-28 bg-gray-50">
            <div className="container">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-white rounded-2xl shadow-sm"
                        >
                            <div
                                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-transparent bg-clip-text"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-gray-600 text-sm md:text-base">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-4">
                        <span className="inline-block text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
                            Neden Biz?
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                            Güvenilir & Profesyonel Hizmet
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Maltepe ve çevresinde 10 yılı aşkın süredir cam balkon, sineklik ve tente
                            sistemlerinde uzmanlaşmış ekibimizle yanınızdayız. Kaliteden ödün vermeden
                            uygun fiyatlar sunuyoruz.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card-hover flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3
                                        className="font-semibold text-gray-900 mb-1"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
