import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)"],
        lato: ["var(--font-lato)", "sans-serif"],
        ephesis: ["var(--font-ephesis)", "cursive"],
        merriweather: ["var(--font-merriweather)", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
