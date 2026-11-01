"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Language } from "@/lib/i18n/types";

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export default function LanguageSelector({
  variant = "desktop",
  className = "",
}: LanguageSelectorProps) {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    availableLanguages.find((l) => l.code === language) || availableLanguages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "mobile") {
    return (
      <div className={`flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100 ${className}`}>
        {availableLanguages.map((l) => {
          const isActive = l.code === language;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span className="text-sm">{l.flag}</span>
              <span>{l.code.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-[var(--primary)] bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
        aria-label="Dil Seçimi"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="uppercase tracking-wider">{currentLang.code}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 py-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {availableLanguages.map((l) => {
            const isActive = l.code === language;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLanguage(l.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isActive
                    ? "bg-gray-50 text-[var(--primary)] font-bold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{l.flag}</span>
                  <span>{l.nativeName}</span>
                </div>
                {isActive && (
                  <svg
                    className="w-3.5 h-3.5 text-[var(--primary)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
