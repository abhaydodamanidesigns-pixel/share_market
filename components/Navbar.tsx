"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/src/dictionaries";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SUPPORTED_LOCALES = ["en", "hi", "kn"];
const DEFAULT_LOCALE = "en";

export default function Navbar({
  dict,
  locale: localeProp,
}: {
  dict: Dictionary;
  locale?: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale =
    localeProp ??
    (pathname.split("/")[1] && SUPPORTED_LOCALES.includes(pathname.split("/")[1])
      ? pathname.split("/")[1]
      : DEFAULT_LOCALE);

  const navLinks = [
    { path: "/learn", label: dict.nav.learn },
    { path: "/invest", label: dict.nav.invest },
    { path: "/protect", label: dict.nav.protect },
    { path: "/recover", label: dict.nav.recover },
    { path: "/resources", label: dict.nav.resources },
    { path: "/about", label: dict.nav.about },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-nav"
          : "bg-white/90 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <nav
        className="container-base flex items-center justify-between h-16 md:h-18"
        aria-label="Main navigation"
      >
        {/* Brand / Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 group"
          aria-label={dict.common.homeAriaLabel}
        >
          {/* Logo mark */}
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-900 text-white font-bold text-base group-hover:bg-navy-800 transition-colors">
            S
          </span>
          <span className="font-bold text-lg text-navy-900 tracking-tight whitespace-nowrap">
            {dict.common.brandName}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden xl:flex items-center gap-1 flex-shrink-0" role="list">
          {navLinks.map(({ path, label }) => {
            const href = `/${locale}${path}`;
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={path}>
                <Link
                  href={href}
                  className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-navy-900 bg-navy-50 font-semibold"
                      : "text-gray-600 hover:text-navy-900 hover:bg-gray-50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA + Language */}
        <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
          <LanguageSwitcher currentLocale={locale} className="flex items-center gap-0.5 shrink-0" />
          <Link
            href={`/${locale}/contact`}
            className="btn-accent text-sm px-5 py-2.5 whitespace-nowrap shrink-0"
          >
            {dict.nav.bookConsultation ?? dict.common.bookConsultation}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="xl:hidden p-2 rounded-lg text-navy-900 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileOpen ? dict.common.closeMenu : dict.common.openMenu}
        >
          <span className="sr-only">
            {isMobileOpen ? dict.common.closeMenu : dict.common.openMenu}
          </span>
          {isMobileOpen ? (
            /* Close icon */
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden bg-white border-t border-gray-100 shadow-lg"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <ul className="container-base py-4 flex flex-col gap-1" role="list">
            {navLinks.map(({ path, label }) => {
              const href = `/${locale}${path}`;
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={path}>
                  <Link
                    href={href}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "text-navy-900 bg-navy-50 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            <li className="pt-2 border-t border-gray-100 mt-2">
              <LanguageSwitcher currentLocale={locale} className="flex items-center gap-0.5 mb-3" />
              <Link
                href={`/${locale}/contact`}
                className="btn-accent w-full justify-center text-sm"
              >
                {dict.nav.bookConsultation ?? dict.common.bookConsultation}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
