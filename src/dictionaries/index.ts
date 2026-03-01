import type en from "./en.json";

export type Dictionary = typeof en;

const SUPPORTED_LOCALES = ["en", "hi", "kn"] as const;
const DEFAULT_LOCALE = "en";

export type Locale = (typeof SUPPORTED_LOCALES)[number];

function isValidLocale(lang: string): lang is Locale {
  return SUPPORTED_LOCALES.includes(lang as Locale);
}

/**
 * Load the dictionary for the given locale asynchronously.
 * Server components should call: const dict = await getDictionary(lang);
 * Falls back to English if the locale is not supported.
 */
export async function getDictionary(lang: string): Promise<Dictionary> {
  const locale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;

  const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
    en: () => import("./en.json"),
    hi: () => import("./hi.json"),
    kn: () => import("./kn.json"),
  };

  const mod = await loaders[locale]();
  return mod.default;
}
