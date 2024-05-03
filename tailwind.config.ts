import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      text: {
        white: {100: "#ffffff"},
        black: {100: '#000000', 90: '#0c0c0c', 80: '#2d2d2d', 70: '#9e9e9e'}
      },
      bg: {
        white: {100: "#ffffff"},
        black: {100: '#000000', 90: '#0c0c0c', 80: '#2d2d2d', 70: '#9e9e9e'},
      },
      gradient: {
        custom: 'linear-gradient(152.48deg,rgb(137, 198, 255) -36.244%,rgb(54, 51, 208) 71.781%)',
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config