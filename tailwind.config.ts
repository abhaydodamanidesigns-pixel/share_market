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
        // Primary brand palette — deep navy
        navy: {
          50: "#eef2ff",
          100: "#dde6ff",
          200: "#c3d0ff",
          300: "#9db2ff",
          400: "#7089ff",
          500: "#4a63f5",
          600: "#3347e9",
          700: "#2636cc",
          800: "#1e2ba5",
          900: "#0F2557", // brand primary
          950: "#0a1640",
        },
        // Accent — warm gold
        gold: {
          50: "#fdf9ee",
          100: "#faf0cf",
          200: "#f5de9b",
          300: "#efc65f",
          400: "#e9b03a",
          500: "#C9A84C", // brand accent
          600: "#b08528",
          700: "#8d6320",
          800: "#744f21",
          900: "#624220",
          950: "#38220e",
        },
        // Neutral surface colors
        surface: {
          50: "#f8f9fc",
          100: "#f0f2f8",
          200: "#e4e8f4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"],
      },
      fontSize: {
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        section: "5rem",
        "section-sm": "3rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,37,87,0.06), 0 4px 12px rgba(15,37,87,0.08)",
        "card-hover": "0 4px 8px rgba(15,37,87,0.08), 0 12px 32px rgba(15,37,87,0.12)",
        nav: "0 1px 0 rgba(15,37,87,0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
