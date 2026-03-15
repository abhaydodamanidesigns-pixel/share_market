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
        // XTrady-inspired: near-black with subtle teal tint
        dark: {
          bg:       "#131415", // --color-bg-primary       hsl(180,2%,8%)  page canvas
          surface:  "#1A1B1B", // --color-bg-secondary     alternating sections
          panel:    "#1E2020", // --color-bg-tertiary      inset panels / light hero
          card:     "#1C1C1C", // --color-surface-primary  hsl(0,0%,11%)  card backgrounds
          elevated: "#232525", // --color-surface-secondary raised surfaces
          border:   "#2D2F2F", // --color-border           dividers / card borders
          hover:    "#252727", // --color-hover-surface    hover states
        },

        // Brand — primary action colour
        // XTrady base: hsl(154,100%,54%) = neon teal-green
        // XTrady base-two: hsl(72,100%,64%) = neon lime
        brand: {
          DEFAULT: "#14FF99", // --color-primary       XTrady teal-green
          hover:   "#0FD680", // --color-primary-hover darker teal
          accent:  "#CBFF47", // --color-accent        XTrady lime-yellow
        },

        // Trading signals — XTrady-matched
        trade: {
          profit: "#00CC14", // --color-profit   hsl(112,100%,40%) buy / gain
          loss:   "#F54444", // --color-loss     hsl(0,96%,63%)    sell / loss
          warn:   "#EBA800", // --color-warning  hsl(40,100%,46%)  caution / neutral
        },

        // Text hierarchy — XTrady-matched
        ink: {
          DEFAULT: "#EDEDED", // --color-text-primary   hsl(0,0%,93%)  headings
          dim:     "#D9D9D9", // --color-text-secondary hsl(0,0%,85%)  body text
          muted:   "#6C7880", // --color-text-muted     hsl(208,7%,46%) meta / placeholders
        },

        // Focus ring
        focus: "#14FF99", // --color-focus-ring (teal)

        // Chart colours
        chart: {
          green: "#00CC14", // --chart-candle-green  bullish candle
          red:   "#F54444", // --chart-candle-red    bearish candle
          grid:  "#252727", // --chart-grid          grid lines
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
        // XTrady-style dark shadows with subtle teal glow on hover
        card:       "0 1px 3px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4)",
        "card-hover":"0 4px 8px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.4), 0 0 24px rgba(20,255,153,0.06)",
        nav:        "0 1px 0 rgba(0,0,0,0.5)",
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
