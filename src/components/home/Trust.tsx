import Image from "next/image";

const stats = [
    { value: "10+", label: "Yıllık Tecrübe", icon: "📅" },
    { value: "500+", label: "Tamamlanan Proje", icon: "🏠" },
    { value: "2 Yıl", label: "Garanti", icon: "🛡️" },
    { value: "%100", label: "Müşteri Memnuniyeti", icon: "⭐" },
];

const features = [
    {
        title: "Ölçüye Özel Üretim",
        description: "Her proje için özel ölçülendirme ve üretim yapıyoruz.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
    },
    {
        title: "Profesyonel Montaj",
        description: "Uzman ekibimiz ile hızlı ve temiz montaj hizmeti.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        title: "Kaliteli Malzeme",
        description: "Avrupa standartlarında, dayanıklı ve estetik malzemeler.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
    },
    {
        title: "Garanti & Destek",
        description: "2 yıl garanti ve satış sonrası teknik destek hizmeti.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
];

export default function Trust() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="container">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative group text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100 hover:border-[var(--primary)]/30 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-xl flex items-center justify-center text-xl shadow-lg">
                                {stat.icon}
                            </div>
                            <div
                                className="text-4xl md:text-5xl font-bold mb-2 mt-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-transparent bg-clip-text"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content with Image */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                                alt="Profesyonel Cam Balkon Montajı"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />

                            {/* Floating badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <polyline points="9 12 11 14 15 10" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Güvenilir Hizmet</div>
                                        <div className="text-sm text-gray-600">10+ yıllık deneyim ile yanınızdayız</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-[var(--primary)]/10 rounded-full blur-2xl" />
                        <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-[var(--secondary)]/10 rounded-full blur-2xl" />
                    </div>

                    {/* Content Side */}
                    <div className="order-1 lg:order-2">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            Neden Biz?
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Güvenilir & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Profesyonel</span> Hizmet
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Maltepe ve çevresinde 10 yılı aşkın süredir cam balkon, sineklik ve tente
                            sistemlerinde uzmanlaşmış ekibimizle yanınızdayız. Kaliteden ödün vermeden
                            uygun fiyatlar sunuyoruz.
                        </p>

                        {/* Features Grid */}
                        <div className="grid gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
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
            </div>
        </section>
    );
}
