import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Pimapen Tamir & Montaj | Ata Yapı Maltepe - PVC Pencere Tamiri",
    description:
        "Maltepe, Kartal ve Pendik'te pimapen tamiri, PVC pencere bakımı, cam değişimi, fitil ve conta yenileme, menteşe ve kilit değişimi. Aynı gün servis, 2 yıl garanti. Ücretsiz keşif için arayın.",
    keywords: ["pimapen tamir", "pimapen tamir maltepe", "pvc pencere tamiri", "pimapen montajı", "pimapen", "pimapen maltepe", "pencere tamiri"],
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/pimapen-tamir',
    },
};

const features = [
    {
        title: "Mekanizma Tamiri",
        description: "Zamanla bozulan veya zor kapanan pencere ve kapı kolu/kilit mekanizmalarını onarıyoruz.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        title: "Fitil & Conta Değişimi",
        description: "Eskimiş ve rüzgar/su geçiren pencerelerinizin fitillerini yenileyerek ısı yalıtımı sağlıyoruz.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
        ),
    },
    {
        title: "Menteşe Değişimi",
        description: "Kırılan veya sarkan kapı ve pencereleriniz için dayanıklı menteşe çözümleri sunuyoruz.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        title: "İzolasyon & Silikon",
        description: "Pencere kenarlarından gelen soğuk hava ve suyu engellemek için profesyonel silikon çekimi.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: "Cam Değişimi",
        description: "Kırılan veya buğulanan çift camlarınızın (Isıcam) yenisi ile değişimini yapıyoruz.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
        ),
    },
    {
        title: "Aksesuar Yenileme",
        description: "Eskimiş kollar, kilitler ve güvenlik kilidi uygulamaları ile pencerelerinizi yenileyin.",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
    },
];

const processSteps = [
    { step: 1, title: "Arıza Tespiti", description: "WhatsApp veya telefon üzerinden arızayı bize bildirin.", icon: "🔍" },
    { step: 2, title: "Fiyat Teklifi", description: "Yapılacak işleme göre uygun fiyatımızı iletelim.", icon: "💰" },
    { step: 3, title: "Yerinde Tamir", description: "Belirlenen saatte gelip tamiri gerçekleştirelim.", icon: "🛠️" },
    { step: 4, title: "Garanti", description: "Tamir sonrası 2 yıl işçilik garantisi veriyoruz.", icon: "🛡️" },
];

export default function PimapenTamirPage() {
    return (
        <>
            {/* Service JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Pimapen Tamir & Montaj",
                        "description": "PVC pencere tamiri, fitil değişimi, cam değişimi, menteşe ve kilit tamiri, silikon çekimi hizmetleri.",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Ata Yapı Maltepe",
                            "url": "https://www.xn--atayap-u9a.site"
                        },
                        "areaServed": ["Maltepe", "Kartal", "Pendik", "Kadıköy"],
                        "url": "https://www.xn--atayap-u9a.site/pimapen-tamir"
                    })
                }}
            />
            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/pimapen.png"
                        alt="Pimapen Montajı ve Tamiri Maltepe"
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
                            Hizmetlerimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Pimapen{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                Montajı & Tamiri
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            PVC pencere ve kapılarınızdaki rüzgar sesi, kapanma zorluğu ve su sızdırma sorunlarına son veriyoruz.
                            Maltepe ve çevresinde profesyonel tamir çözümleri.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                Ücretsiz Keşif & Fiyat Al
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* List of services/problems */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            Hangi Sorunları Çözüyoruz?
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            PVC Tamir <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Çözümleri</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Yılların vermiş olduğu tecrübe ile her marka PVC sisteminin tamirini garantili olarak yapıyoruz.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 lg:py-28 bg-gray-50">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/10 rounded-full text-sm font-semibold text-gray-900 mb-4">
                            Çalışma Şeklimiz
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Süreç Nasıl İlerliyor?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((item) => (
                            <div key={item.step} className="relative bg-white rounded-2xl p-8 shadow-md text-center group hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {item.step}
                                </div>
                                <div className="text-4xl mb-4 mt-2">{item.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                <div className="container text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Pencerelerinizi Isı ve Ses Yalıtımlı Hale Getirelim
                    </h2>
                    <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                        Ata Yapı güvencesiyle pimapen tamiri ve bakımı için hemen iletişime geçin. Uygun fiyat, kaliteli işçilik.
                    </p>
                    <Link
                        href="/iletisim"
                        className="btn-press inline-flex items-center gap-3 bg-white text-[var(--primary)] hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl"
                    >
                        Fiyat Teklifi Alın
                    </Link>
                </div>
            </section>
        </>
    );
}
