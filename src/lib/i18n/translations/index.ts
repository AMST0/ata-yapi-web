import { Language, TranslationSchema, LanguageOption } from "../types";
import { tr } from "./tr";
import { en } from "./en";
import { de } from "./de";

export const translations: Record<Language, TranslationSchema> = {
  tr,
  en,
  de,
};

export const languages: LanguageOption[] = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷", nativeName: "Türkçe" },
  { code: "en", name: "English", flag: "🇬🇧", nativeName: "English" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", nativeName: "Deutsch" },
];

export const defaultLanguage: Language = "tr";
