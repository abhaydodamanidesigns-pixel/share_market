import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ── No-flash inline script ─────────────────────────────────────────────────
   Runs synchronously before React hydration to prevent the light→dark flicker.
   Reads localStorage first, falls back to OS prefers-color-scheme.
   ───────────────────────────────────────────────────────────────────────── */
const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('saarthi-theme');
    var osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme  = stored || (osDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    // If localStorage is blocked (private browsing), default to dark
    document.documentElement.classList.add('dark');
  }
})();
`.trim();

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saarthi-finance.in"),
  title: {
    default: "Saarthi Finance — Your Financial Lifecycle Partner for Families",
    template: "%s | Saarthi Finance",
  },
  description:
    "Saarthi Finance is a SEBI-registered investment adviser helping Indian families navigate every stage of their financial journey — from learning and investing to protecting wealth and recovering lost assets.",
  keywords: [
    "SEBI registered investment adviser India",
    "financial planning for families India",
    "IEPF claim assistance",
    "insurance advisory India",
    "physical share dematerialisation",
    "financial lifecycle partner",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Saarthi Finance",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * Note: we cannot statically know the theme at SSR time, so we suppress
     * the hydration warning on <html> — the inline script handles the class
     * before React mounts and the ThemeProvider syncs state client-side.
     */
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Blocks paint until theme class is applied — prevents flash */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
