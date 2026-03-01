"use client";

import { useEffect } from "react";

const LOCALE_MAP: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};

export default function LangAttribute({ lang }: { lang: string }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = LOCALE_MAP[lang] ?? "en-IN";
    }
  }, [lang]);
  return null;
}
