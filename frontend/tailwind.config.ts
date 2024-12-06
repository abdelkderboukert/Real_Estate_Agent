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
        background: "#eae9f0",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'zink-blue-zink': 'linear-gradient(to right, #d4d4d8, #e4e4e7, #d4d4d8)',
      },
    },
  },
  plugins: [],
};
export default config;
