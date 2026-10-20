import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        pink: "#FF2DA8",
        lime: "#D4FF3F",
        t1: "#EDEDED",
        t2: "#A8A8A8",
        t3: "#8A8A8A",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-geist)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;