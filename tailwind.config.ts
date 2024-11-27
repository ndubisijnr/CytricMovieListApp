import type { Config } from "tailwindcss";
import tailwindcssFilters from "tailwindcss-filters";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize:{
      },
      spacing:{

      }
    },
  },
  plugins: [
    tailwindcssFilters
  ],
} satisfies Config;