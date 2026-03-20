import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import ja from "./ja";

const STORAGE_KEY = "paperclip-locale";

function getInitialLanguage(): string {
  // 1. Stored preference
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (stored === "ja" || stored === "en")) return stored;

  // 2. Browser language
  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "ja") return "ja";

  return "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ja: { translation: ja },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

/** Persist language preference and switch. */
export function setLanguage(lang: string) {
  localStorage.setItem(STORAGE_KEY, lang);
  i18n.changeLanguage(lang);
}

export function getLanguage(): string {
  return i18n.language;
}

export const supportedLanguages = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
] as const;

export default i18n;
