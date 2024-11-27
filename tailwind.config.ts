import type { Config } from "tailwindcss";

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
      fontStyle:{
        "header-one":"",
        "header-two":"",
        "header-three":"",
        "header-four":"",
        "header-five":"",
        "header-six":"",
        "body-large":"",
        "body-regular":"",
        "body-small":"",
        "body-extra-small":"",
        "caption":"",

      }
    },
  },
  plugins: [],
} satisfies Config;
