"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/src/dictionaries";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

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
    { path: "/learn",     label: dict.nav.learn     },
    { path: "/invest",    label: dict.nav.invest    },
    { path: "/protect",   label: dict.nav.protect   },
    { path: "/recover",   label: dict.nav.recover   },
    { path: "/resources", label: dict.nav.resources },
    { path: "/about",     label: dict.nav.about     },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        /* Premium glassmorphism: bg uses CSS var so it adapts to light/dark */
        "transition-all duration-300",
        isScrolled
          ? "backdrop-blur-[12px] shadow-[var(--shadow-nav)] border-b"
          : "backdrop-blur-[6px]",
      ].join(" ")}
      style={{
        backgroundColor: isScrolled
          ? "var(--nav-bg)"
          : "transparent",
        borderBottomColor: isScrolled ? "var(--nav-border)" : "transparent",
      }}
      role="banner"
    >
      <nav
        className="container-base flex items-center justify-between h-16 md:h-[4.5rem]"
        aria-label="Main navigation"
      >
        {/* ── Brand / Logo ── */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 group flex-shrink-0"
          aria-label={dict.common.homeAriaLabel}
        >
          <span
            className="flex items-center justify-center w-9 h-9 rounded-xl font-bold text-base text-white transition-all duration-200 group-hover:scale-105"
            style={{ backgroundColor: "var(--brand)" }}
          >
            S
          </span>
          <span
            className="font-bold text-lg tracking-tight whitespace-nowrap"
            style={{ color: "var(--text-primary)" }}
          >
            {dict.common.brandName}
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden xl:flex items-center gap-1 flex-shrink-0" role="list">
          {navLinks.map(({ path, label }) => {
            const href = `/${locale}${path}`;
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={path}>
                <Link
                  href={href}
                  className={[
                    "whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium",
                    "transition-all duration-200",
                    isActive
                      ? "font-semibold"
                      : "",
                  ].join(" ")}
                  style={{
                    color: isActive ? "var(--brand)" : "var(--text-secondary)",
                    backgroundColor: isActive ? "var(--surface-hover)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--surface-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                    }
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop: Theme toggle + Language + CTA ── */}
        <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />
          <LanguageSwitcher
            currentLocale={locale}
            className="flex items-center gap-0.5 shrink-0"
          />
          <Link
            href={`/${locale}/contact`}
            className="btn-accent text-sm px-5 py-2.5 whitespace-nowrap shrink-0"
          >
            {dict.nav.bookConsultation ?? dict.common.bookConsultation}
          </Link>
        </div>

        {/* ── Mobile: Theme toggle + Hamburger ── */}
        <div className="xl:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg transition-colors duration-200"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--surface-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "transparent")
            }
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? dict.common.closeMenu : dict.common.openMenu}
          >
            <span className="sr-only">
              {isMobileOpen ? dict.common.closeMenu : dict.common.openMenu}
            </span>
            {isMobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden border-t shadow-lg"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
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
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color: isActive ? "var(--brand)" : "var(--text-secondary)",
                      backgroundColor: isActive ? "var(--surface-hover)" : "transparent",
                      fontWeight: isActive ? "600" : "500",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            <li className="pt-2 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
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
