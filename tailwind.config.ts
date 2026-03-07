import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Trading Platform Dark Palette ──────────────────────────────────
        // Single source of truth: update hex here to retheme the entire app.
        // Matching CSS custom properties are defined in globals.css :root.

        // Backgrounds (darkest → slightly lighter)
        dark: {
          bg:       "#0B0F1A", // --color-bg-primary       page canvas
          surface:  "#111827", // --color-bg-secondary     alternating sections
          panel:    "#1A2236", // --color-bg-tertiary      inset panels / light hero
          card:     "#141B2D", // --color-surface-primary  card backgrounds
          elevated: "#1C253A", // --color-surface-secondary raised surfaces
          border:   "#2A344A", // --color-border           dividers / card borders
          hover:    "#1F2937", // --color-hover-surface    hover states
        },

        // Brand — primary action colour (blue = trust / action)
        brand: {
          DEFAULT: "#3B82F6", // --color-primary
          hover:   "#2563EB", // --color-primary-hover
          accent:  "#22D3EE", // --color-accent (cyan)
        },

        // Trading signals
        trade: {
          profit: "#22C55E", // --color-profit   buy / gain
          loss:   "#EF4444", // --color-loss     sell / loss
          warn:   "#F59E0B", // --color-warning  caution / neutral
        },

        // Text hierarchy
        ink: {
          DEFAULT: "#E5E7EB", // --color-text-primary   headings / body
          dim:     "#9CA3AF", // --color-text-secondary subtext
          muted:   "#6B7280", // --color-text-muted     placeholders / meta
        },

        // Focus ring
        focus: "#3B82F6", // --color-focus-ring

        // Chart colours (standard trading convention)
        chart: {
          green: "#22C55E", // --chart-candle-green  bullish candle
          red:   "#EF4444", // --chart-candle-red    bearish candle
          grid:  "#1F2937", // --chart-grid          grid lines
        },

        // ── Legacy palette (kept for backward-compat if missed anywhere) ──
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
        surface: {
          50:  "#f8f9fc",
          100: "#f0f2f8",
          200: "#e4e8f4",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"],
      },
      fontSize: {
        "display-xl": ["3.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg": ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },
      spacing: {
        section:    "5rem",
        "section-sm": "3rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        // Dark-mode-appropriate shadows (deep, not navy-tinted)
        card:       "0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)",
        "card-hover":"0 4px 8px rgba(0,0,0,0.4), 0 12px 32px rgba(0,0,0,0.4)",
        nav:        "0 1px 0 rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
