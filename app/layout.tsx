import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en-IN" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
