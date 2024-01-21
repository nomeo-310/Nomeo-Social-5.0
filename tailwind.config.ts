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
    extend: {
      colors: {
        primaryBlue: "#6F00FF",
        secondaryBlue: "#6050DC",
        tertiaryBlue: "#1E90FF",
        primaryRed: "#CC0000",
        secondaryRed: "#E23D28",
        tertiaryRed: "#FF0000",
        primaryGreen: "#32de84",
        secondaryGreen: "#00563B",
        tertiaryGreen: "#1CAC78"
      },
      fontFamily: {
        "urbanist": "var(--font-urbanist)",
        "patrick": "var(--font-patrick)",
        "redhat":"var(--font-redhat)"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config