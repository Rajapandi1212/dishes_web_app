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
        text: {
          main: "var(--text-main)",
          light: "var(--text-light)",
        },
        main: "var(--bg-main)",
        light: "var(--bg-light)",
        button: "var(--button)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
      },
    },
  },
  plugins: [],
};
export default config;
