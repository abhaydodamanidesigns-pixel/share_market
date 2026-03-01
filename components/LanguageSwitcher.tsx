"use client";

import { usePathname, useRouter } from "next/navigation";

const SUPPORTED_LOCALES = ["en", "hi", "kn"] as const;
const DEFAULT_LOCALE = "en";

const LOCALE_LABELS: Record<(typeof SUPPORTED_LOCALES)[number], string> = {
  en: "English",
  hi: "हिंदी",
  kn: "ಕನ್ನಡ",
};

function isValidLocale(lang: string): lang is (typeof SUPPORTED_LOCALES)[number] {
  return (SUPPORTED_LOCALES as readonly string[]).includes(lang);
}

export default function LanguageSwitcher({
  currentLocale,
  className,
}: {
  currentLocale?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const locale =
    currentLocale && isValidLocale(currentLocale) ? currentLocale : DEFAULT_LOCALE;

  // Extract path without locale: /en/learn → /learn, /hi → ''
  const segments = pathname.split("/").filter(Boolean);
  const pathWithoutLocale =
    segments.length > 1 ? "/" + segments.slice(1).join("/") : "";

  const handleLocaleChange = (newLocale: (typeof SUPPORTED_LOCALES)[number]) => {
    if (newLocale === locale) return;
    const newPath = `/${newLocale}${pathWithoutLocale || ""}`;
    router.push(newPath);
  };

  return (
    <div
      className={className}
      role="group"
      aria-label="Language switcher"
    >
      {SUPPORTED_LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => handleLocaleChange(loc)}
          className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            loc === locale
              ? "bg-navy-100 text-navy-900 font-semibold"
              : "text-gray-600 hover:text-navy-900 hover:bg-gray-100"
          }`}
          aria-pressed={loc === locale}
          aria-label={`Switch to ${LOCALE_LABELS[loc]}`}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
