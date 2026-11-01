"use client";

import { useState } from "react";

export default function GarageAnimation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative max-w-3xl mx-auto">
            {/* Interactive SVG Garage */}
            <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl p-8 md:p-12 overflow-hidden">
                {/* Sky background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-50 to-gray-100 rounded-3xl" />
                
                <div className="relative z-10">
                    {/* Garage SVG */}
                    <svg
                        viewBox="0 0 400 280"
                        className="w-full h-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Teleskopik garaj animasyonu - açık/kapalı durumu gösterir"
                    >
                        {/* Ground */}
                        <rect x="0" y="240" width="400" height="40" fill="#94A3B8" rx="4" />
                        <rect x="40" y="240" width="320" height="5" fill="#64748B" rx="2" />
                        
                        {/* Rails */}
                        <rect x="50" y="238" width="300" height="4" fill="#475569" rx="1" />
                        <rect x="60" y="236" width="280" height="2" fill="#334155" />
                        
                        {/* Car body */}
                        <g className={`transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-60"}`}>
                            {/* Car base */}
                            <rect x="120" y="205" width="160" height="35" rx="8" fill="#1E3A5F" />
                            {/* Car top */}
                            <path d="M150 205 L165 175 L250 175 L265 205" fill="#1E3A5F" />
                            {/* Windows */}
                            <path d="M155 203 L167 178 L200 178 L200 203" fill="#87CEEB" opacity="0.7" />
                            <path d="M205 203 L205 178 L248 178 L258 203" fill="#87CEEB" opacity="0.7" />
                            {/* Wheels */}
                            <circle cx="155" cy="240" r="14" fill="#1F2937" />
                            <circle cx="155" cy="240" r="8" fill="#4B5563" />
                            <circle cx="155" cy="240" r="3" fill="#9CA3AF" />
                            <circle cx="245" cy="240" r="14" fill="#1F2937" />
                            <circle cx="245" cy="240" r="8" fill="#4B5563" />
                            <circle cx="245" cy="240" r="3" fill="#9CA3AF" />
                            {/* Headlights */}
                            <rect x="265" y="215" width="12" height="6" rx="2" fill="#FCD34D" />
                            <rect x="123" y="215" width="12" height="6" rx="2" fill="#EF4444" opacity="0.8" />
                        </g>

                        {/* Garage panels - telescopic */}
                        {[0, 1, 2, 3].map((i) => (
                            <g key={i}>
                                <rect
                                    x={60 + i * (isOpen ? 65 : 0)}
                                    y={isOpen ? 60 + i * 8 : 20}
                                    width={isOpen ? 75 : 280}
                                    height={isOpen ? 50 : 220}
                                    rx="4"
                                    fill={`rgba(${100 + i * 30}, ${120 + i * 20}, ${140 + i * 15}, ${isOpen ? 0.7 - i * 0.1 : 0.85 - i * 0.05})`}
                                    stroke="#64748B"
                                    strokeWidth="1.5"
                                    className="garage-panel"
                                    style={{
                                        transform: isOpen 
                                            ? `translateX(${i * 5}px) scaleY(0.3)` 
                                            : 'translateX(0) scaleY(1)',
                                        transformOrigin: 'top center',
                                        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s`,
                                    }}
                                />
                                {/* Panel horizontal lines */}
                                {!isOpen && [1, 2, 3, 4].map((line) => (
                                    <line
                                        key={`line-${i}-${line}`}
                                        x1="65"
                                        y1={20 + line * 44}
                                        x2="335"
                                        y2={20 + line * 44}
                                        stroke="#94A3B8"
                                        strokeWidth="0.5"
                                        opacity={isOpen ? 0 : 0.5}
                                        style={{ transition: 'opacity 0.5s ease' }}
                                    />
                                ))}
                            </g>
                        ))}

                        {/* Side pillars */}
                        <rect x="40" y="15" width="15" height="230" fill="#374151" rx="3" />
                        <rect x="345" y="15" width="15" height="230" fill="#374151" rx="3" />
                        
                        {/* Top beam */}
                        <rect x="40" y="10" width="320" height="12" fill="#1F2937" rx="4" />

                        {/* Status indicator */}
                        <circle cx="200" cy="8" r="4" fill={isOpen ? "#22C55E" : "#EF4444"}>
                            <animate
                                attributeName="opacity"
                                values="1;0.5;1"
                                dur="2s"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </svg>

                    {/* Toggle Button */}
                    <div className="flex flex-col items-center mt-8 gap-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="btn-press inline-flex items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/25"
                            aria-label={isOpen ? "Garajı kapat" : "Garajı aç"}
                        >
                            <svg className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="17 11 12 6 7 11" />
                                <polyline points="17 18 12 13 7 18" />
                            </svg>
                            {isOpen ? "Garajı Kapat" : "Garajı Aç"}
                        </button>
                        
                        {/* Status text */}
                        <div className="flex items-center gap-2 text-sm">
                            <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                            <span className="text-gray-600 font-medium">
                                {isOpen ? "Garaj açık — araç erişime hazır" : "Garaj kapalı — araç korunaklı konumda"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
