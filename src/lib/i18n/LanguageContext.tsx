"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && (saved === "tr" || saved === "en" || saved === "de")) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        // Tarayıcı dilini kontrol et
        const browserLang = navigator.language.slice(0, 2).toLowerCase();
        if (browserLang === "de") {
          setLanguageState("de");
          document.documentElement.lang = "de";
        } else if (browserLang === "en") {
          setLanguageState("en");
          document.documentElement.lang = "en";
        }
      }
    } catch {
      // localStorage erişim hatası olursa yoksay
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // localStorage erişim hatası olursa yoksay
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
