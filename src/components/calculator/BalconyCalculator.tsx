"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BalconyPreview from "./BalconyPreview";
import AnimatedNumber from "./AnimatedNumber";
import Toast from "./Toast";
import { trackCalculatorWhatsApp } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { getWhatsAppUrl } from "@/lib/constants";
import {
  WhatsAppIcon,
  ShieldIcon,
  RulerIcon,
  WrenchIcon,
  LayersIcon,
} from "@/components/icons/ArchitecturalIcons";

type BalconyType = "flat" | "L" | "U";

interface TechnicalSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  onStartDragging: () => void;
}

function TechnicalSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  onStartDragging,
}: TechnicalSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {label}
        </span>
        <div className="inline-flex items-baseline gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-sm font-bold">
          <span>{value}</span>
          <span className="text-[11px] text-slate-400 font-normal">cm</span>
        </div>
      </div>

      <div className="relative h-2 bg-slate-200 rounded-full">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-slate-900"
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
            onStartDragging();
          }}
          aria-label={label}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--primary)] rounded-full shadow-md border-2 border-white pointer-events-none"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>

      <div className="flex justify-between text-[11px] font-mono text-slate-400">
        <span>{min} cm</span>
        <span>{max} cm</span>
      </div>
    </div>
  );
}

export default function BalconyCalculator() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [mainWidth, setMainWidth] = useState(320);
  const [mainHeight, setMainHeight] = useState(240);
  const [leftWidth, setLeftWidth] = useState(160);
  const [leftHeight, setLeftHeight] = useState(240);
  const [rightWidth, setRightWidth] = useState(160);
  const [rightHeight, setRightHeight] = useState(240);

  const [balconyType, setBalconyType] = useState<BalconyType>("flat");
  const [showToast, setShowToast] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const balconyTypes = [
    { id: "flat" as const, label: t.calculator.type_flat, code: "I" },
    { id: "L" as const, label: t.calculator.type_l, code: "L" },
    { id: "U" as const, label: t.calculator.type_u, code: "U" },
  ];

  const calculatePanels = useCallback(() => {
    const panelWidth = 55;
    const mainPanels = Math.ceil(mainWidth / panelWidth);

    if (balconyType === "L") {
      return mainPanels + Math.ceil(leftWidth / panelWidth);
    }
    if (balconyType === "U") {
      return (
        mainPanels +
        Math.ceil(leftWidth / panelWidth) +
        Math.ceil(rightWidth / panelWidth)
      );
    }
    return mainPanels;
  }, [mainWidth, leftWidth, rightWidth, balconyType]);

  const calculateArea = useCallback(() => {
    const mainArea = (mainWidth * mainHeight) / 10000;

    if (balconyType === "L") {
      return mainArea + (leftWidth * leftHeight) / 10000;
    }
    if (balconyType === "U") {
      return (
        mainArea +
        (leftWidth * leftHeight) / 10000 +
        (rightWidth * rightHeight) / 10000
      );
    }
    return mainArea;
  }, [mainWidth, mainHeight, leftWidth, leftHeight, rightWidth, rightHeight, balconyType]);

  const panels = calculatePanels();
  const area = calculateArea();

  useEffect(() => {
    if (!isDragging) return;
    const timeout = setTimeout(() => {
      setShowToast(true);
      setIsDragging(false);
      setTimeout(() => setShowToast(false), 1400);
    }, 400);
    return () => clearTimeout(timeout);
  }, [mainWidth, mainHeight, leftWidth, leftHeight, rightWidth, rightHeight, isDragging]);

  const buildWhatsAppMessage = () => {
    const typeLabels: Record<BalconyType, string> = {
      flat: t.calculator.type_flat,
      L: t.calculator.type_l,
      U: t.calculator.type_u,
    };

    let dims = `• ${t.calculator.main_section}: ${mainWidth} x ${mainHeight} cm`;
    if (balconyType === "L") {
      dims += `\n• ${t.calculator.side_section}: ${leftWidth} x ${leftHeight} cm`;
    } else if (balconyType === "U") {
      dims += `\n• ${t.calculator.left_section}: ${leftWidth} x ${leftHeight} cm`;
      dims += `\n• ${t.calculator.right_section}: ${rightWidth} x ${rightHeight} cm`;
    }

    return `${t.calculator.wa_intro}\n\n[${t.calculator.wa_dims} - ${typeLabels[balconyType]}]\n${dims}\n\n[${t.calculator.wa_est}]\n• ${t.calculator.est_area}: ${area.toFixed(2)} m²\n• ${t.calculator.panel_count}: ${panels} ${t.calculator.unit_pcs}\n\n${t.calculator.wa_outro}`;
  };

  return (
    <section id="hesaplayici" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
            <span className="w-6 h-[2px] bg-[var(--primary)]" />
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-slate-900 mb-3">
            {t.calculator.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Architectural Configurator Frame */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-6 lg:p-8 shadow-sm">
          {/* Geometry Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
            <div className="inline-flex bg-slate-200/70 rounded-xl p-1 gap-1 w-full sm:w-auto">
              {balconyTypes.map((type) => {
                const active = balconyType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setBalconyType(type.id)}
                    className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      active
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded text-[11px] font-mono font-bold inline-flex items-center justify-center ${
                        active ? "bg-red-600 text-white" : "bg-slate-300/70 text-slate-700"
                      }`}
                    >
                      {type.code}
                    </span>
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>CAD // 55cm STD PANEL</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: CAD Elevation Preview + Dimension Controls */}
            <div className="lg:col-span-8 space-y-5">
              {/* Technical Elevation Canvas */}
              <div className="relative bg-white arch-grid-light rounded-xl p-6 min-h-[260px] flex items-center justify-center border border-slate-200">
                <div className="absolute top-3.5 left-4 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-white/90 px-2.5 py-1 rounded border border-slate-200">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span>{t.calculator.live_preview}</span>
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

              {/* Dimension Input Panels */}
              <div className="space-y-4">
                <div className="p-5 sm:p-6 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-xs font-bold">
                        A
                      </span>
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {balconyType === "flat"
                          ? t.calculator.balcony_dims
                          : t.calculator.main_section}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {mainWidth} × {mainHeight} cm
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <TechnicalSlider
                      label={t.calculator.width}
                      value={mainWidth}
                      onChange={setMainWidth}
                      min={100}
                      max={600}
                      step={10}
                      onStartDragging={() => setIsDragging(true)}
                    />
                    <TechnicalSlider
                      label={t.calculator.height}
                      value={mainHeight}
                      onChange={setMainHeight}
                      min={150}
                      max={350}
                      step={5}
                      onStartDragging={() => setIsDragging(true)}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {(balconyType === "L" || balconyType === "U") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 bg-white rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2 py-0.5 rounded bg-slate-700 text-white font-mono text-xs font-bold">
                              B
                            </span>
                            <span className="font-bold text-slate-900 text-sm sm:text-base">
                              {balconyType === "U"
                                ? t.calculator.left_section
                                : t.calculator.side_section}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-400">
                            {leftWidth} × {leftHeight} cm
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <TechnicalSlider
                            label={t.calculator.width}
                            value={leftWidth}
                            onChange={setLeftWidth}
                            min={50}
                            max={300}
                            step={10}
                            onStartDragging={() => setIsDragging(true)}
                          />
                          <TechnicalSlider
                            label={t.calculator.height}
                            value={leftHeight}
                            onChange={setLeftHeight}
                            min={100}
                            max={300}
                            step={5}
                            onStartDragging={() => setIsDragging(true)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {balconyType === "U" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 bg-white rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2 py-0.5 rounded bg-slate-700 text-white font-mono text-xs font-bold">
                              C
                            </span>
                            <span className="font-bold text-slate-900 text-sm sm:text-base">
                              {t.calculator.right_section}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-400">
                            {rightWidth} × {rightHeight} cm
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <TechnicalSlider
                            label={t.calculator.width}
                            value={rightWidth}
                            onChange={setRightWidth}
                            min={50}
                            max={300}
                            step={10}
                            onStartDragging={() => setIsDragging(true)}
                          />
                          <TechnicalSlider
                            label={t.calculator.height}
                            value={rightHeight}
                            onChange={setRightHeight}
                            min={100}
                            max={300}
                            step={5}
                            onStartDragging={() => setIsDragging(true)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Dark Obsidian Technical Readout & WhatsApp Dispatch */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <div className="bg-[#0b0f19] text-white rounded-xl p-6 border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    {t.calculator.est_results}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t.calculator.instant_calc}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>{t.calculator.est_area}</span>
                      <RulerIcon className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <AnimatedNumber
                        value={area}
                        decimals={2}
                        reducedMotion={shouldReduceMotion ?? false}
                        className="text-3xl sm:text-4xl font-bold font-mono text-white"
                      />
                      <span className="text-base text-slate-400 font-mono">m²</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>{t.calculator.panel_count}</span>
                      <LayersIcon className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <AnimatedNumber
                        value={panels}
                        decimals={0}
                        reducedMotion={shouldReduceMotion ?? false}
                        className="text-3xl sm:text-4xl font-bold font-mono text-white"
                      />
                      <span className="text-base text-slate-400">
                        {t.calculator.unit_pcs}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl(buildWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackCalculatorWhatsApp}
                  className="btn-press mt-6 flex items-center justify-center gap-2.5 w-full bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-4 rounded-xl font-semibold text-sm sm:text-base transition-colors shadow-lg shadow-emerald-950/40"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>{t.calculator.cta_request}</span>
                </a>

                <p className="mt-3.5 text-[11px] text-slate-400 text-center leading-relaxed">
                  {t.calculator.disclaimer}
                </p>
              </div>

              {/* Clean SVG Engineering Assurances */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                  <ShieldIcon className="w-4 h-4 text-[var(--primary)] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-slate-700 leading-tight">
                    {t.calculator.b1_warranty}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                  <RulerIcon className="w-4 h-4 text-[var(--primary)] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-slate-700 leading-tight">
                    {t.calculator.b2_custom}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                  <WrenchIcon className="w-4 h-4 text-[var(--primary)] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-slate-700 leading-tight">
                    {t.calculator.b3_install}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast show={showToast} message={t.calculator.toast_calculated} />
    </section>
  );
}
