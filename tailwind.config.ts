
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        // Inspired by the product
        beige: "#EFE1C3",
        black: "#1A1D1A",
        charcoal: "#232323",
        sand: "#DDD1B2",
        accent: "#8E9196",
        white: "#FAFAF7",
        grayish: "#bab7ae",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(.21,1.02,.73,1.13)",
      },
      boxShadow: {
        card: "0 8px 32px 0 rgba(34,40,49,0.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
