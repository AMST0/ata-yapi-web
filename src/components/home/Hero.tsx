import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />

            {/* Animated Accent Lines */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                <div className="absolute top-1/4 right-0 w-96 h-1 bg-gradient-to-l from-[var(--primary)] to-transparent animate-fade-in" />
                <div className="absolute top-1/3 right-0 w-72 h-1 bg-gradient-to-l from-[var(--secondary)] to-transparent animate-fade-in-delay-1" />
                <div className="absolute top-1/2 right-0 w-80 h-1 bg-gradient-to-l from-[var(--accent)] to-transparent animate-fade-in-delay-2" />
            </div>

            <div className="container relative z-10">
                <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 mb-6 animate-fade-in">
                        <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                        Maltepe&lsquo;de 10+ Yıllık Tecrübe
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-delay-1" style={{ fontFamily: 'var(--font-heading)' }}>
                        Cam Balkon, Sineklik &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]">
                            Tente Sistemleri
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in-delay-2">
                        Ölçüye özel üretim, profesyonel montaj ve 2 yıl garanti ile
                        yaşam alanlarınızı dönüştürüyoruz.{" "}
                        <strong className="text-white">Ücretsiz keşif</strong> için hemen arayın.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 animate-fade-in-delay-3">
                        <Link
                            href="/iletisim"
                            className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            Ücretsiz Keşif
                        </Link>
                        <Link
                            href="#hesaplayici"
                            className="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm border border-white/20 transition-all duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="4" y="2" width="16" height="20" rx="2" />
                                <line x1="8" y1="6" x2="16" y2="6" />
                                <line x1="8" y1="10" x2="16" y2="10" />
                                <line x1="8" y1="14" x2="12" y2="14" />
                                <line x1="8" y1="18" x2="10" y2="18" />
                            </svg>
                            Fiyat Hesapla
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-[var(--accent)]"
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
                            <span>Ücretsiz Keşif</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-[var(--accent)]"
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
                            <span>2 Yıl Garanti</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-[var(--accent)]"
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
                            <span>Ölçüye Özel Üretim</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
