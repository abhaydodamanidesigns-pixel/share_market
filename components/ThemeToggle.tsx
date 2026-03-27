"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

/* ── Premium easing ─────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Icons ──────────────────────────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4.5 h-4.5"
      aria-hidden="true"
      style={{ width: "18px", height: "18px" }}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4.5 h-4.5"
      aria-hidden="true"
      style={{ width: "18px", height: "18px" }}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ── Component ──────────────────────────────────────────────────────────── */
interface ThemeToggleProps {
  /** Extra Tailwind classes to apply to the button wrapper */
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggle, resolved } = useTheme();

  /* Prevent layout shift before theme resolves */
  if (!resolved) {
    return (
      <div
        className="w-9 h-9 rounded-xl"
        style={{ backgroundColor: "var(--surface-hover)" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className={[
        "relative w-9 h-9 rounded-xl flex items-center justify-center",
        "overflow-hidden transition-colors duration-300",
        "focus-visible:outline-none",
        className,
      ].join(" ")}
      style={{
        backgroundColor: "var(--surface-hover)",
        color: "var(--text-secondary)",
        border: "1px solid var(--border)",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Hover background ring */}
      <motion.span
        className="absolute inset-0 rounded-xl"
        initial={false}
        whileHover={{ backgroundColor: "var(--surface-hover)" }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />

      {/* Icon crossfade with rotational transition */}
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="moon"
            className="relative z-10 flex items-center justify-center"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate:  90,  opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <MoonIcon />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            className="relative z-10 flex items-center justify-center"
            initial={{ rotate:  90, opacity: 0, scale: 0.8 }}
            animate={{ rotate:  0,  opacity: 1, scale: 1   }}
            exit={{   rotate: -90,  opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <SunIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
