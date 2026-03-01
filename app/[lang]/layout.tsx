import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LangAttribute from "@/components/LangAttribute";
import { getDictionary } from "@/src/dictionaries";

const SUPPORTED_LOCALES = ["en", "hi", "kn"] as const;
const DEFAULT_LOCALE = "en";

type LangParam = (typeof SUPPORTED_LOCALES)[number];

function isValidLocale(lang: string): lang is LangParam {
  return SUPPORTED_LOCALES.includes(lang as LangParam);
}

const LOCALE_MAP: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = isValidLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  return {
    openGraph: {
      locale: LOCALE_MAP[lang] ?? "en-IN",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const lang = isValidLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const dict = await getDictionary(lang);

  return (
    <>
      <LangAttribute lang={lang} />
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 btn-primary"
      >
        {dict.common.skipToContent}
      </a>

      <Navbar dict={dict} locale={lang} />

      <main id="main-content">{children}</main>

      <Footer locale={lang} dict={dict} />
    </>
  );
}
