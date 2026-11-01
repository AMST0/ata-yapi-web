"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
    {
        id: "malzeme",
        title: "Malzeme",
        icon: "🔩",
        question: "Hangi malzeme tercih edilsin?",
        note: "Malzeme seçimi projeye ve müşteri talebine göre değişebilir.",
        options: [
            {
                id: "paslanmaz-celik",
                name: "Paslanmaz Çelik",
                description: "Yüksek dayanıklılık, uzun ömür. Deniz kenarı ve zorlu hava koşullarına uygun.",
                icon: "🛡️",
            },
            {
                id: "aluminyum",
                name: "Alüminyum",
                description: "Hafif, korozyona dayanıklı, modern görünüm. Kolay montaj ve bakım.",
                icon: "⚡",
            },
            {
                id: "ozel-kombinasyon",
                name: "Projeye Özel Kombinasyon",
                description: "İhtiyacınıza göre farklı malzemelerin bir arada kullanıldığı özel çözümler.",
                icon: "🔧",
            },
        ],
    },
    {
        id: "kaplama",
        title: "Kaplama",
        icon: "🎨",
        question: "Hangi kaplama tipi tercih edilsin?",
        note: "Kaplama seçenekleri kullanım alanı ve bütçeye göre özelleştirilebilir.",
        options: [
            {
                id: "polikarbonat",
                name: "Polikarbonat (PC) Panel",
                description: "Şeffaf veya yarı şeffaf, hafif ve darbelere dayanıklı. UV korumalı.",
                icon: "💎",
            },
            {
                id: "oxford-kumash",
                name: "600D Oxford Kumaş",
                description: "Suya dayanıklı, hafif ve taşınabilir. Ekonomik çözüm arayanlar için ideal.",
                icon: "🧵",
            },
            {
                id: "pvc-kaplama",
                name: "PVC / Özel Kaplama",
                description: "Farklı renk ve desen seçenekleri. Projeye özel kaplama imkanı.",
                icon: "🎯",
            },
        ],
    },
    {
        id: "sistem",
        title: "Sistem Tipi",
        icon: "⚙️",
        question: "Hangi sistem tipi uygun?",
        note: "Sistem tipi kullanım sıklığı ve bütçeye göre belirlenebilir.",
        options: [
            {
                id: "manuel",
                name: "Manuel Sistem",
                description: "Elle açılıp kapanan, ekonomik çözüm. Basit mekanizma, düşük bakım maliyeti.",
                icon: "✋",
            },
            {
                id: "motorlu",
                name: "Motorlu Sistem",
                description: "Elektrik motorlu, uzaktan kumandalı. Konforlu kullanım, tek tuşla kontrol.",
                icon: "🔌",
            },
            {
                id: "akilli",
                name: "Akıllı Sistem",
                description: "Sensörlü, otomatik açılma/kapanma. Yağmur sensörü, zamanlayıcı ve mobil kontrol.",
                icon: "📱",
            },
        ],
    },
    {
        id: "kullanim",
        title: "Kullanım Alanı",
        icon: "🏠",
        question: "Kullanım amacınız nedir?",
        note: "Her proje için özel çözüm üretiyoruz.",
        options: [
            {
                id: "konut",
                name: "Konut / Villa",
                description: "Ev ve villa garajları için kompakt ve estetik çözümler.",
                icon: "🏡",
            },
            {
                id: "ticari",
                name: "Ticari / İşletme",
                description: "İşyeri, otopark ve ticari alanlar için endüstriyel dayanıklılık.",
                icon: "🏢",
            },
            {
                id: "ozel",
                name: "Tekne / Karavan / Özel",
                description: "Tekne, karavan ve özel araç koruma çözümleri.",
                icon: "🚤",
            },
        ],
    },
];

export default function GarageConfigurator() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});
    const [animateKey, setAnimateKey] = useState(0);

    const isComplete = currentStep >= steps.length;
    const step = !isComplete ? steps[currentStep] : null;
    const progress = ((currentStep) / steps.length) * 100;

    const handleSelect = (optionId: string) => {
        if (!step) return;
        setSelections((prev) => ({ ...prev, [step.id]: optionId }));
    };

    const handleNext = () => {
        if (step && selections[step.id]) {
            setCurrentStep((prev) => prev + 1);
            setAnimateKey((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            setAnimateKey((prev) => prev + 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setSelections({});
        setAnimateKey((prev) => prev + 1);
    };

    const getSelectionName = (stepId: string, optionId: string) => {
        const s = steps.find((st) => st.id === stepId);
        return s?.options.find((o) => o.id === optionId)?.name || optionId;
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    {steps.map((s, i) => (
                        <div
                            key={s.id}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${i <= currentStep ? "text-[var(--primary)]" : "text-gray-400"
                                }`}
                        >
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${i < currentStep
                                    ? "bg-[var(--primary)] text-white"
                                    : i === currentStep
                                        ? "bg-[var(--primary)]/10 text-[var(--primary)] ring-2 ring-[var(--primary)]"
                                        : "bg-gray-100 text-gray-400"
                                    }`}
                            >
                                {i < currentStep ? "✓" : s.icon}
                            </div>
                            <span className="hidden md:inline">{s.title}</span>
                        </div>
                    ))}
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {!isComplete && step ? (
                <div key={animateKey} className="animate-step-in">
                    {/* Question */}
                    <div className="text-center mb-8">
                        <h3
                            className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {step.question}
                        </h3>
                        <p className="text-gray-500 text-sm">{step.note}</p>
                    </div>

                    {/* Options */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        {step.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                className={`selection-card p-6 rounded-2xl border-2 text-left ${selections[step.id] === option.id
                                    ? "active border-[var(--primary)] bg-[var(--primary)]/5"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                            >
                                <div className="text-3xl mb-3">{option.icon}</div>
                                <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                    {option.name}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
                                {selections[step.id] === option.id && (
                                    <div className="mt-3 flex items-center gap-1.5 text-[var(--primary)] text-sm font-medium">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 12l2 2 4-4" />
                                            <circle cx="12" cy="12" r="10" />
                                        </svg>
                                        Seçildi
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 0
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Geri
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!selections[step.id]}
                            className={`btn-press inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${selections[step.id]
                                ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white shadow-lg shadow-red-500/25"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {currentStep === steps.length - 1 ? "Sonuçları Gör" : "Devam Et"}
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                /* Results */
                <div key={animateKey} className="animate-scale-in">
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-white text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/20 rounded-full text-sm font-medium text-[var(--accent)] mb-6">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 12l2 2 4-4" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            Konfigürasyon Tamamlandı
                        </div>

                        <h3
                            className="text-2xl md:text-3xl font-bold mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Seçimlerinize Göre Özel Çözüm
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                            Aşağıdaki tercihlerinize uygun bir teleskopik garaj sistemi hazırlayabiliriz.
                            Kesin fiyat ve detaylı proje bilgisi için ücretsiz keşif hizmetimizden yararlanın.
                        </p>

                        {/* Selection Summary */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto text-left">
                            {Object.entries(selections).map(([stepId, optionId]) => {
                                const stepData = steps.find((s) => s.id === stepId);
                                return (
                                    <div
                                        key={stepId}
                                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                                    >
                                        <div className="text-xs text-gray-400 mb-1">{stepData?.title}</div>
                                        <div className="font-semibold text-white">
                                            {getSelectionName(stepId, optionId)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="text-xs text-gray-500 mb-8">
                            * Malzeme ve sistem özellikleri projeye ve müşteri talebine göre değişiklik gösterebilir.
                            Yukarıdaki seçimler nihai ürünü temsil etmez, ihtiyaçlarınızın anlaşılması için bir referanstır.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/iletisim"
                                className="btn-press inline-flex items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                Projenize Uygun Teklif Alın
                            </Link>
                            <a
                                href="https://wa.me/905314002959?text=Merhaba%2C%20teleskopik%20garaj%20sistemi%20hakkında%20bilgi%20almak%20istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-press inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp İle Yazın
                            </a>
                        </div>

                        {/* Reset */}
                        <button
                            onClick={handleReset}
                            className="mt-6 text-gray-400 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-1"
                        >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="1 4 1 10 7 10" />
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                            Baştan Başla
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
