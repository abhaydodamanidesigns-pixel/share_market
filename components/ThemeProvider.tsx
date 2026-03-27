"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

/* ── Types ──────────────────────────────────────────────────────────────── */
type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  /** True once the theme has been resolved from localStorage / OS pref */
  resolved: boolean;
}

/* ── Context ────────────────────────────────────────────────────────────── */
const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
  resolved: false,
});

/* ── Storage key ────────────────────────────────────────────────────────── */
const STORAGE_KEY = "saarthi-theme";

/* ── Helper — apply class to <html> ────────────────────────────────────── */
function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.setAttribute("data-theme", theme);
}

/* ── Provider ───────────────────────────────────────────────────────────── */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [resolved, setResolved] = useState(false);

  /* On mount: read localStorage first, fall back to OS preference */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const osPrefers: Theme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initial: Theme = stored ?? osPrefers;
    setTheme(initial);
    applyTheme(initial);
    setResolved(true);
  }, []);

  /* Listen to OS changes if the user hasn't set a manual preference */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const next: Theme = e.matches ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ── Hook ───────────────────────────────────────────────────────────────── */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
