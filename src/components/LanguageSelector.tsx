"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Language } from "@/lib/i18n/types";

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile";
  direction?: "down" | "up";
  theme?: "light" | "dark";
  className?: string;
}

function FlagIcon({ code }: { code: Language }) {
  if (code === "tr") {
    return (
      <svg viewBox="0 0 24 16" className="w-4 h-3 rounded-[2px] shrink-0 shadow-xs" aria-hidden="true">
        <rect width="24" height="16" fill="#E30A17" />
        <circle cx="10" cy="8" r="4" fill="#ffffff" />
        <circle cx="11.1" cy="8" r="3.2" fill="#E30A17" />
        <polygon points="14.2,8 16.5,8.7 15.1,6.8 15.1,9.2 16.5,7.3" fill="#ffffff" />
      </svg>
    );
  }
  if (code === "de") {
    return (
      <svg viewBox="0 0 24 16" className="w-4 h-3 rounded-[2px] shrink-0 shadow-xs" aria-hidden="true">
        <rect width="24" height="5.33" y="0" fill="#111827" />
        <rect width="24" height="5.33" y="5.33" fill="#DD0000" />
        <rect width="24" height="5.34" y="10.66" fill="#FFCE00" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 16" className="w-4 h-3 rounded-[2px] shrink-0 shadow-xs" aria-hidden="true">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#ffffff" strokeWidth="2.8" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M12,0 V16 M0,8 H24" stroke="#ffffff" strokeWidth="4.4" />
      <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  );
}

export default function LanguageSelector({
  variant = "desktop",
  direction = "down",
  theme = "light",
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
      <div className={`grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200/80 ${className}`}>
        {availableLanguages.map((l) => {
          const isActive = l.code === language;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FlagIcon code={l.code} />
              <span>{l.code.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
          isDark
            ? "bg-slate-900/90 text-slate-200 border-slate-700 hover:border-slate-500 hover:text-white"
            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
        }`}
        aria-label="Language"
        aria-expanded={isOpen}
      >
        <FlagIcon code={currentLang.code} />
        <span className="uppercase tracking-wider">{currentLang.code}</span>
        <svg
          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
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

      {isOpen && (
        <div
          className={`absolute right-0 py-1.5 w-40 rounded-xl shadow-xl border z-50 ${
            direction === "up" ? "bottom-full mb-2" : "top-full mt-1.5"
          } ${
            isDark
              ? "bg-slate-900 border-slate-700 text-slate-200"
              : "bg-white border-slate-200 text-slate-700"
          }`}
        >
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
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                  isActive
                    ? isDark
                      ? "bg-slate-800 text-white font-semibold"
                      : "bg-slate-50 text-[var(--primary)] font-semibold"
                    : isDark
                    ? "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FlagIcon code={l.code} />
                  <span>{l.nativeName}</span>
                </div>
                {isActive && (
                  <svg
                    className={`w-3.5 h-3.5 ${isDark ? "text-red-400" : "text-[var(--primary)]"}`}
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
