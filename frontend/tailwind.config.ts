import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      fontFamily: {
        sans: ["var(--font-big-shoulders-display)"],
        display: ["var(--font-baloo2)"],
      },
      fontSize: {
        "2xsm": "var(--text2xsm)",
        xsm: "var(--textXsm)",
        sm: "var(--textSm)",
        base: "var(--textBase)",
        xl: "var(--textXl)",
        "2xl": "var(--text2xl)",
        "3xl": "var(--text3xl)",
        "4xl": "var(--text4xl)",
        "5xl": "var(--text5xl)",
        "6xl": "var(--text6xl)",
        "7xl": "var(--text7xl)",
      },
      borderRadius: {
        xsm: "var(--radiusXsm)",
        sm: "var(--radiusSm)",
        md: "var(--radiusMd)",
        lg: "var(--radiusLg)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1720px",

      aboutBreak: "1376px",
    },
  },
  plugins: [],
} satisfies Config;
