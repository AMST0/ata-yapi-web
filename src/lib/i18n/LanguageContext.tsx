"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Language, TranslationSchema, LanguageOption } from "./types";
import { translations, languages, defaultLanguage } from "./translations";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextProps>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: translations[defaultLanguage],
  availableLanguages: languages,
});

const STORAGE_KEY = "ata_yapi_lang";
const LANG_CHANGE_EVENT = "ata_yapi_lang_change";

function subscribeLanguage(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
  };
}

function getClientLanguageSnapshot(): Language {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "tr" || saved === "en" || saved === "de") {
      return saved;
    }
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (browserLang === "de") return "de";
    if (browserLang === "en") return "en";
  } catch {
    // Ignore storage access errors
  }
  return defaultLanguage;
}

function getServerLanguageSnapshot(): Language {
  return defaultLanguage;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = useSyncExternalStore(
    subscribeLanguage,
    getClientLanguageSnapshot,
    getServerLanguageSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
    } catch {
      // Ignore storage access errors
    }
  };

  const t = translations[language] || translations[defaultLanguage];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        availableLanguages: languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
