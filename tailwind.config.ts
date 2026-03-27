import type { Config } from "tailwindcss";

/**
 * ARCHITECTURE NOTE — CSS Variable-backed color tokens
 * ─────────────────────────────────────────────────────
 * Every color used in the app that must switch between light / dark mode
 * now references a CSS custom property defined in globals.css.
 *
 * Tailwind compiles  bg-dark-surface  →  background-color: var(--color-dark-surface)
 * globals.css :root defines the LIGHT value for --color-dark-surface.
 * globals.css .dark  defines the DARK  value for --color-dark-surface.
 *
 * Result: all 100+ uses of bg-dark-*, text-ink*, border-dark-* across every
 * page and component automatically cascade with the theme — no component
 * needs to be touched individually.
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Theme-switching palette — all backed by CSS variables ────────────
        // These are the canonical color tokens. Adding a CSS variable here
        // means Tailwind generates  background-color: var(--xyz)  so the
        // compiled class responds to :root / .dark without JS.

        dark: {
          bg:       "var(--color-dark-bg)",       // page canvas
          surface:  "var(--color-dark-surface)",  // alternating sections
          panel:    "var(--color-dark-panel)",    // inset panels
          card:     "var(--color-dark-card)",     // card backgrounds
          elevated: "var(--color-dark-elevated)", // raised surfaces
          border:   "var(--color-dark-border)",   // dividers / borders
          hover:    "var(--color-dark-hover)",    // hover state overlays
        },

        // Brand / action — shifts slightly between modes
        brand: {
          DEFAULT: "var(--color-brand)",        // primary CTA colour
          hover:   "var(--color-brand-hover)",
          accent:  "var(--color-brand-accent)", // secondary highlight
        },

        // Text hierarchy — switches between charcoal (light) and off-white (dark)
        ink: {
          DEFAULT: "var(--color-ink)",
          dim:     "var(--color-ink-dim)",
          muted:   "var(--color-ink-muted)",
        },

        // Trading signals — kept constant across modes for unambiguous meaning
        trade: {
          profit: "#22C55E",
          loss:   "#EF4444",
          warn:   "#F59E0B",
        },

        // Focus ring
        focus: "var(--color-brand)",

        // Chart candles
        chart: {
          green: "#22C55E",
          red:   "#EF4444",
          grid:  "var(--color-dark-border)",
        },

        // ── Legacy / extended palettes (not theme-switching) ─────────────────
        navy: {
          50:  "#eef2ff",
          100: "#dde6ff",
          200: "#c3d0ff",
          300: "#9db2ff",
          400: "#7089ff",
          500: "#4a63f5",
          600: "#3347e9",
          700: "#2636cc",
          800: "#1e2ba5",
          900: "#0F2557",
          950: "#0a1640",
        },
        gold: {
          50:  "#fdf9ee",
          100: "#faf0cf",
          200: "#f5de9b",
          300: "#efc65f",
          400: "#e9b03a",
          500: "#C9A84C",
          600: "#b08528",
          700: "#8d6320",
          800: "#744f21",
          900: "#624220",
          950: "#38220e",
        },
      },

      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"],
      },

      fontSize: {
        "display-xl": ["3.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg": ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },

      spacing: {
        section:      "5rem",
        "section-sm": "3rem",
      },

      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      boxShadow: {
        card:           "var(--shadow-card)",
        "card-hover":   "var(--shadow-card-hover)",
        nav:            "var(--shadow-nav)",
      },

      animation: {
        "fade-up":       "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "chart-draw":    "drawChart 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards",
        "ambient-pulse": "ambientPulse 8s ease-in-out infinite",
        "scroll-reveal": "scrollReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        /* Lifecycle Mission Trust Ticker — 35 s deliberate institutional pace */
        "ticker":        "ticker 35s linear infinite",

        /* AnimatedHeroBanner — ambient mesh blob drift */
        "mesh-1":        "meshBlob1 15s ease-in-out infinite",
        "mesh-2":        "meshBlob2 18s ease-in-out infinite",
        "mesh-3":        "meshBlob3 12s ease-in-out infinite",

        /* AnimatedHeroBanner — floating micro-card bob */
        "bob-up":        "microBobUp   4s ease-in-out infinite",
        "bob-down":      "microBobDown 5s ease-in-out infinite",

        /* AnimatedHeroBanner — bar chart grow */
        "bar-grow":      "barGrow 1s cubic-bezier(0.16, 1, 0.3, 1) both",
      },

      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drawChart: {
          to: { strokeDashoffset: "0" },
        },
        ambientPulse: {
          "0%, 100%": { transform: "scale(1)",    opacity: "0.35" },
          "50%":       { transform: "scale(1.05)", opacity: "0.55" },
        },
        scrollReveal: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /*
         * Ticker scroll — the track is exactly 2× the visible content width.
         * translateX(-50%) moves precisely one full copy, so the loop is
         * perfectly seamless with no jump or blank gap.
         */
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },

        /* AnimatedHeroBanner */
        meshBlob1: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%":       { transform: "translate(3%, -5%) scale(1.08)" },
          "66%":       { transform: "translate(-4%, 3%) scale(0.95)" },
        },
        meshBlob2: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%":       { transform: "translate(-5%, 4%) scale(1.06)" },
          "66%":       { transform: "translate(3%, -3%) scale(0.97)" },
        },
        meshBlob3: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "50%":       { transform: "translate(4%, -4%) scale(1.05)" },
        },
        microBobUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-6px)" },
        },
        microBobDown: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(6px)" },
        },
        barGrow: {
          from: { transform: "scaleY(0)" },
          to:   { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
