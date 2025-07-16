import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
      colors: {
        ...defaultConfig.theme.extend.colors,
        cream: {
          50: "#faf8f5",
          100: "#f4f1eb",
          200: "#e8ddd4",
          300: "#d9c7b8",
          400: "#c8ad98",
          500: "#b8947c",
          600: "#a67c63",
          700: "#8a6650",
          800: "#715444",
          900: "#5c453a",
        },
        terracotta: {
          50: "#fdf4f3",
          100: "#fce7e4",
          200: "#f9d3ce",
          300: "#f4b5ab",
          400: "#ec8b7a",
          500: "#e0654f",
          600: "#cd4a32",
          700: "#ab3a26",
          800: "#8d3123",
          900: "#752d23",
        },
        sage: {
          50: "#f6f7f4",
          100: "#e9ebe3",
          200: "#d4d8c8",
          300: "#b8bfa5",
          400: "#9ba382",
          500: "#7f8a65",
          600: "#636d4f",
          700: "#4f5640",
          800: "#424636",
          900: "#393c30",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.8s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
