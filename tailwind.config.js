/** @type {import('tailwindcss').Config} */
import { platformSelect } from "nativewind/theme";
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4d89eb",
        dark: "#1a1a1a",
        "light-dark": "#262626",
        gray: "#303030",
        white: "#ffffff",
      },
      fontFamily: {
        sans: ["sf-pro-display-regular", "sans"],
        bold: ["sf-pro-display-bold", "sans"],
        italic: ["sf-pro-display-italic", "sans"],
      }
    },
  },
  plugins: [],
};
