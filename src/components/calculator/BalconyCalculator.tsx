"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BalconyPreview from "./BalconyPreview";
import AnimatedNumber from "./AnimatedNumber";
import Toast from "./Toast";
import { trackCalculatorWhatsApp } from "@/lib/analytics";

type BalconyType = "flat" | "L" | "U";

const balconyTypes = [
    { id: "flat" as const, label: "Düz", icon: "▭" },
    { id: "L" as const, label: "L Tipi", icon: "⌐" },
    { id: "U" as const, label: "U Tipi", icon: "⊔" },
];

export default function BalconyCalculator() {
    const shouldReduceMotion = useReducedMotion();

    // Main (center) dimensions
    const [mainWidth, setMainWidth] = useState(300);
    const [mainHeight, setMainHeight] = useState(250);

    // Left side dimensions (for L and U types)
    const [leftWidth, setLeftWidth] = useState(150);
    const [leftHeight, setLeftHeight] = useState(200);

    // Right side dimensions (for U type)
    const [rightWidth, setRightWidth] = useState(150);
    const [rightHeight, setRightHeight] = useState(200);

    const [balconyType, setBalconyType] = useState<BalconyType>("flat");
    const [showToast, setShowToast] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate panels (every 50-60 cm = 1 panel)
    const calculatePanels = useCallback(() => {
        const panelWidth = 55;
        const mainPanels = Math.ceil(mainWidth / panelWidth);

        if (balconyType === "L") {
            const leftPanels = Math.ceil(leftWidth / panelWidth);
            return mainPanels + leftPanels;
        } else if (balconyType === "U") {
            const leftPanels = Math.ceil(leftWidth / panelWidth);
            const rightPanels = Math.ceil(rightWidth / panelWidth);
            return mainPanels + leftPanels + rightPanels;
        }

        return mainPanels;
    }, [mainWidth, leftWidth, rightWidth, balconyType]);

    // Calculate area in m²
    const calculateArea = useCallback(() => {
        const mainArea = (mainWidth * mainHeight) / 10000;

        if (balconyType === "L") {
            const leftArea = (leftWidth * leftHeight) / 10000;
            return mainArea + leftArea;
        } else if (balconyType === "U") {
            const leftArea = (leftWidth * leftHeight) / 10000;
            const rightArea = (rightWidth * rightHeight) / 10000;
            return mainArea + leftArea + rightArea;
        }

        return mainArea;
    }, [mainWidth, mainHeight, leftWidth, leftHeight, rightWidth, rightHeight, balconyType]);

    const panels = calculatePanels();
    const area = calculateArea();

    // Show toast when slider stops
    useEffect(() => {
        if (!isDragging) return;
        const timeout = setTimeout(() => {
            setShowToast(true);
            setIsDragging(false);
            setTimeout(() => setShowToast(false), 1500);
        }, 400);
        return () => clearTimeout(timeout);
    }, [mainWidth, mainHeight, leftWidth, leftHeight, rightWidth, rightHeight, isDragging]);

    // Generate WhatsApp message
    const generateWhatsAppMessage = () => {
        const typeLabels = { flat: "Düz", L: "L Tipi", U: "U Tipi" };

        let dimensionsText = `- Ana Genişlik: ${mainWidth} cm\n- Ana Yükseklik: ${mainHeight} cm`;

        if (balconyType === "L") {
            dimensionsText += `\n- Sol Yan Genişlik: ${leftWidth} cm\n- Sol Yan Yükseklik: ${leftHeight} cm`;
        } else if (balconyType === "U") {
            dimensionsText += `\n- Sol Yan: ${leftWidth}x${leftHeight} cm`;
            dimensionsText += `\n- Sağ Yan: ${rightWidth}x${rightHeight} cm`;
        }

        const message = `Merhaba, cam balkon için fiyat almak istiyorum.

📐 Ölçüler (${typeLabels[balconyType]}):
${dimensionsText}

📊 Tahmini:
- Alan: ${area.toFixed(2)} m²
- Panel Sayısı: ${panels} adet

Lütfen ücretsiz keşif için bana dönüş yapar mısınız?`;

        return encodeURIComponent(message);
    };

    const PremiumSlider = ({
        label,
        value,
        onChange,
        min,
        max,
        step,
        gradient
    }: {
        label: string;
        value: number;
        onChange: (v: number) => void;
        min: number;
        max: number;
        step: number;
        gradient: string;
    }) => {
        const percentage = ((value - min) / (max - min)) * 100;

        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">{label}</span>
                    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50 shadow-sm">
                        <span className="text-lg font-bold text-gray-900">{value}</span>
                        <span className="text-xs text-gray-500">cm</span>
                    </div>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`absolute inset-y-0 left-0 rounded-full ${gradient}`}
                        style={{ width: `${percentage}%` }}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => {
                            onChange(Number(e.target.value));
                            setIsDragging(true);
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-gray-300 cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                        style={{ left: `calc(${percentage}% - 10px)` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>{min} cm</span>
                    <span>{max} cm</span>
                </div>
            </div>
        );
    };

    return (
        <section id="hesaplayici" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-full text-sm font-semibold text-[var(--primary)] mb-4">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="4" y="2" width="16" height="20" rx="2" />
                                <line x1="8" y1="6" x2="16" y2="6" />
                                <line x1="8" y1="10" x2="16" y2="10" />
                                <line x1="8" y1="14" x2="12" y2="14" />
                            </svg>
                            Akıllı Hesaplayıcı
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Cam Balkon <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Fiyat Hesaplayıcı</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Balkon ölçülerinizi girerek tahmini maliyet hesaplayın. Kesin fiyat için ücretsiz keşif randevusu alın.
                        </p>
                    </motion.div>
                </div>

                {/* Calculator Container */}
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        {/* Decorative background */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary)]/5 via-[var(--secondary)]/5 to-[var(--accent)]/5 rounded-[2rem] blur-xl" />

                        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
                            {/* Balcony Type Selection */}
                            <div className="flex justify-center mb-10">
                                <div className="inline-flex bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 gap-1">
                                    {balconyTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setBalconyType(type.id)}
                                            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${balconyType === type.id
                                                ? "text-white shadow-lg"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                                                }`}
                                        >
                                            <span className="text-lg">{type.icon}</span>
                                            <span>{type.label}</span>
                                            {balconyType === type.id && (
                                                <motion.div
                                                    layoutId="activeTabBg"
                                                    className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-xl -z-10"
                                                    transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Main Layout */}
                            <div className="grid lg:grid-cols-[1fr_320px] gap-8">
                                {/* Left: Preview + Sliders */}
                                <div className="space-y-6">
                                    {/* SVG Preview */}
                                    <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-6 min-h-[280px] flex items-center justify-center border border-gray-100">
                                        <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-gray-400">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            Canlı Önizleme
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <BalconyPreview
                                                key={balconyType}
                                                mainWidth={mainWidth}
                                                mainHeight={mainHeight}
                                                leftWidth={leftWidth}
                                                leftHeight={leftHeight}
                                                rightWidth={rightWidth}
                                                rightHeight={rightHeight}
                                                type={balconyType}
                                                reducedMotion={shouldReduceMotion ?? false}
                                            />
                                        </AnimatePresence>
                                    </div>

                                    {/* Dimension Controls */}
                                    <div className="space-y-4">
                                        {/* Main Section */}
                                        <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 rounded-2xl border border-blue-100/50">
                                            <div className="flex items-center gap-2 mb-5">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                                    </svg>
                                                </div>
                                                <span className="font-bold text-gray-800">
                                                    {balconyType === "flat" ? "Balkon Ölçüleri" : "Ana Bölüm (Orta)"}
                                                </span>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <PremiumSlider label="Genişlik" value={mainWidth} onChange={setMainWidth} min={100} max={600} step={10} gradient="bg-gradient-to-r from-blue-400 to-blue-600" />
                                                <PremiumSlider label="Yükseklik" value={mainHeight} onChange={setMainHeight} min={150} max={350} step={5} gradient="bg-gradient-to-r from-indigo-400 to-indigo-600" />
                                            </div>
                                        </div>

                                        {/* Left Side Section */}
                                        <AnimatePresence>
                                            {(balconyType === "L" || balconyType === "U") && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-6 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 rounded-2xl border border-emerald-100/50">
                                                        <div className="flex items-center gap-2 mb-5">
                                                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M3 3h18v18H3z" />
                                                                    <path d="M3 12h9v9" />
                                                                </svg>
                                                            </div>
                                                            <span className="font-bold text-gray-800">
                                                                {balconyType === "U" ? "Sol Yan Bölüm" : "Yan Bölüm"}
                                                            </span>
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            <PremiumSlider label="Genişlik" value={leftWidth} onChange={setLeftWidth} min={50} max={300} step={10} gradient="bg-gradient-to-r from-emerald-400 to-emerald-600" />
                                                            <PremiumSlider label="Yükseklik" value={leftHeight} onChange={setLeftHeight} min={100} max={300} step={5} gradient="bg-gradient-to-r from-teal-400 to-teal-600" />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Right Side Section */}
                                        <AnimatePresence>
                                            {balconyType === "U" && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-6 bg-gradient-to-br from-violet-50/80 to-purple-50/50 rounded-2xl border border-violet-100/50">
                                                        <div className="flex items-center gap-2 mb-5">
                                                            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M3 3h18v18H3z" />
                                                                    <path d="M12 12h9v9" />
                                                                </svg>
                                                            </div>
                                                            <span className="font-bold text-gray-800">Sağ Yan Bölüm</span>
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            <PremiumSlider label="Genişlik" value={rightWidth} onChange={setRightWidth} min={50} max={300} step={10} gradient="bg-gradient-to-r from-violet-400 to-violet-600" />
                                                            <PremiumSlider label="Yükseklik" value={rightHeight} onChange={setRightHeight} min={100} max={300} step={5} gradient="bg-gradient-to-r from-purple-400 to-purple-600" />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Right: Results Panel */}
                                <div className="lg:sticky lg:top-8 h-fit">
                                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 text-white">
                                        <div className="text-center mb-6">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-gray-300 mb-4">
                                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                                Anlık Hesaplama
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-200">Tahmini Sonuçlar</h3>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Area */}
                                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                                            <path d="M9 9h6v6H9z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm text-gray-400">Tahmini Alan</span>
                                                </div>
                                                <div className="flex items-baseline gap-2">
                                                    <AnimatedNumber value={area} decimals={2} reducedMotion={shouldReduceMotion ?? false} className="text-4xl font-bold text-white" />
                                                    <span className="text-xl text-gray-400">m²</span>
                                                </div>
                                            </div>

                                            {/* Panels */}
                                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect x="3" y="3" width="6" height="18" rx="1" />
                                                            <rect x="11" y="3" width="4" height="18" rx="1" />
                                                            <rect x="17" y="3" width="4" height="18" rx="1" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm text-gray-400">Panel Sayısı</span>
                                                </div>
                                                <div className="flex items-baseline gap-2">
                                                    <AnimatedNumber value={panels} decimals={0} reducedMotion={shouldReduceMotion ?? false} className="text-4xl font-bold text-white" />
                                                    <span className="text-xl text-gray-400">adet</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <motion.a
                                            href={`https://wa.me/905314002959?text=${generateWhatsAppMessage()}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={trackCalculatorWhatsApp}
                                            className="mt-6 flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 hover:from-emerald-500 hover:to-[var(--accent)] text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                                            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                                            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            Ücretsiz Keşif Talep Et
                                        </motion.a>

                                        <p className="mt-4 text-xs text-gray-500 text-center">
                                            * Kesin fiyat için yerinde ölçüm gereklidir.
                                        </p>
                                    </div>

                                    {/* Trust badges */}
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <div className="text-2xl mb-1">🛡️</div>
                                            <div className="text-xs font-medium text-gray-600">2 Yıl Garanti</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <div className="text-2xl mb-1">📏</div>
                                            <div className="text-xs font-medium text-gray-600">Özel Üretim</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <div className="text-2xl mb-1">🚚</div>
                                            <div className="text-xs font-medium text-gray-600">Ücretsiz Montaj</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Toast show={showToast} message="Hesaplandı ✓" />
        </section>
    );
}
