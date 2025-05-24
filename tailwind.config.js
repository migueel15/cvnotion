/** @type {import('tailwindcss').Config} */
import { platformSelect } from "nativewind/theme";
import colors from "./src/colors"
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ["sf-pro-display-regular", "sans"],
        bold: ["sf-pro-display-bold", "sans"],
        italic: ["sf-pro-display-italic", "sans"],
      }
    },
  },
  plugins: [],
};
