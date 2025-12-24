/**
 * "Garanti ve montaj süreci" explainer block
 */
export default function WarrantyProcess() {
    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="text-2xl md:text-3xl font-bold mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Garanti ve Montaj Süreci
                        </h2>
                        <p className="text-gray-400">
                            Kaliteli işçilik ve güvenilir garanti ile hizmetinizdeyiz.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Garanti */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-[var(--primary)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Garanti Kapsamı
                                </h3>
                            </div>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>2 yıl işçilik ve montaj garantisi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Cam ve profillerde 10 yıl üretici garantisi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Tente kumaşlarında 5 yıl renk garantisi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Ücretsiz teknik destek hattı</span>
                                </li>
                            </ul>
                        </div>

                        {/* Montaj Süreci */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-[var(--accent)]/20 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-[var(--accent)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Montaj Süreci
                                </h3>
                            </div>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Deneyimli ve sigortalı montaj ekibi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Temiz ve düzenli çalışma ortamı</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>1-2 günde montaj tamamlanır</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Montaj sonrası kullanım eğitimi</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
