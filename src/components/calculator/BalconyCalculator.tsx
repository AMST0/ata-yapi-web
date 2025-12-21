"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BalconyPreview from "./BalconyPreview";
import AnimatedNumber from "./AnimatedNumber";
import Toast from "./Toast";

type BalconyType = "flat" | "L" | "U";

const balconyTypes = [
    { id: "flat" as const, label: "Düz" },
    { id: "L" as const, label: "L Tipi" },
    { id: "U" as const, label: "U Tipi" },
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

    const SliderInput = ({
        label,
        value,
        onChange,
        min,
        max,
        step,
        color
    }: {
        label: string;
        value: number;
        onChange: (v: number) => void;
        min: number;
        max: number;
        step: number;
        color: string;
    }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}: <span style={{ color }}>{value} cm</span>
            </label>
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
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
                style={{
                    background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
                }}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>{min} cm</span>
                <span>{max} cm</span>
            </div>
        </div>
    );

    return (
        <section id="hesaplayici" className="py-20 lg:py-28 bg-gray-50">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="inline-block text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
                        Hesaplayıcı
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Cam Balkon Hesaplayıcı
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Balkon ölçülerinizi girerek tahmini panel sayısını ve alanı hesaplayın.
                    </p>
                </div>

                {/* Calculator Container */}
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100"
                    >
                        {/* Balcony Type Tabs */}
                        <div className="flex justify-center mb-8">
                            <div className="relative inline-flex bg-gray-100 rounded-xl p-1">
                                {balconyTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setBalconyType(type.id)}
                                        className={`relative px-6 py-2.5 rounded-lg font-medium text-sm transition-colors z-10 ${balconyType === type.id ? "text-white" : "text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        {type.label}
                                        {balconyType === type.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-[var(--primary)] rounded-lg -z-10"
                                                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Calculator Layout */}
                        <div className="grid lg:grid-cols-[1fr_180px] gap-6 items-stretch">
                            {/* Left: Sliders + Preview */}
                            <div className="flex flex-col gap-4">
                                {/* Dimension Controls */}
                                <div className="grid gap-4">
                                    {/* Main Section */}
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <div className="text-sm font-semibold text-blue-700 mb-3">
                                            {balconyType === "flat" ? "Balkon Ölçüleri" : "Ana Bölüm (Orta)"}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <SliderInput label="Genişlik" value={mainWidth} onChange={setMainWidth} min={100} max={600} step={10} color="#E31E24" />
                                            <SliderInput label="Yükseklik" value={mainHeight} onChange={setMainHeight} min={150} max={350} step={5} color="#00A0E3" />
                                        </div>
                                    </div>

                                    {/* Left Side Section (L and U types) */}
                                    <AnimatePresence>
                                        {(balconyType === "L" || balconyType === "U") && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                                    <div className="text-sm font-semibold text-green-700 mb-3">
                                                        {balconyType === "U" ? "Sol Yan Bölüm" : "Yan Bölüm"}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <SliderInput label="Genişlik" value={leftWidth} onChange={setLeftWidth} min={50} max={300} step={10} color="#8DC63F" />
                                                        <SliderInput label="Yükseklik" value={leftHeight} onChange={setLeftHeight} min={100} max={300} step={5} color="#059669" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Right Side Section (U type only) */}
                                    <AnimatePresence>
                                        {balconyType === "U" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                                    <div className="text-sm font-semibold text-purple-700 mb-3">
                                                        Sağ Yan Bölüm
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <SliderInput label="Genişlik" value={rightWidth} onChange={setRightWidth} min={50} max={300} step={10} color="#8b5cf6" />
                                                        <SliderInput label="Yükseklik" value={rightHeight} onChange={setRightHeight} min={100} max={300} step={5} color="#7c3aed" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* SVG Preview */}
                                <div className="flex-1 min-h-[220px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
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
                            </div>

                            {/* Right: Results Panel */}
                            <div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-5">
                                <div className="text-center">
                                    <div className="text-sm text-gray-500 mb-1">Tahmini Alan</div>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <AnimatedNumber value={area} decimals={2} reducedMotion={shouldReduceMotion ?? false} className="text-3xl font-bold text-gray-900" />
                                        <span className="text-gray-500 text-lg">m²</span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-sm text-gray-500 mb-1">Panel Sayısı</div>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <AnimatedNumber value={panels} decimals={0} reducedMotion={shouldReduceMotion ?? false} className="text-3xl font-bold text-gray-900" />
                                        <span className="text-gray-500 text-lg">adet</span>
                                    </div>
                                </div>

                                <motion.a
                                    href={`https://wa.me/905XXXXXXXXX?text=${generateWhatsAppMessage()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-4 py-3 rounded-xl font-medium transition-colors"
                                    whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <span>Fiyat Al</span>
                                </motion.a>

                                <p className="text-xs text-gray-400 text-center">
                                    * Kesin fiyat için yerinde ölçüm gereklidir.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Toast show={showToast} message="Hesaplandı ✓" />
        </section>
    );
}
