import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#10182a',
          panel: '#182238',
          hover: '#232f4b',
          border: '#2c3a5c',
          accent: '#34507a',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
