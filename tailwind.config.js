/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00BFB3",
        MountainMist: "#8F9098",
        AddToCart: "#DD5202",
        White: "#FFFFFF",
        Black: "#000000",
      },
      fontFamily: {
        pthin: ["Roboto-Thin", "sans-serif"],
        pthinitalic: ["Roboto-ThinItalic", "sans-serif"],
        plight: ["Roboto-Light", "sans-serif"],
        plightitalic: ["Roboto-LightItalic", "sans-serif"],
        pregular: ["Roboto-Regular", "sans-serif"],
        pitalic: ["Roboto-Italic", "sans-serif"],
        pmedium: ["Roboto-Medium", "sans-serif"],
        pmediumitalic: ["Roboto-MediumItalic", "sans-serif"],
        pbold: ["Roboto-Bold", "sans-serif"],
        pbolditalic: ["Roboto-BoldItalic", "sans-serif"],
        pblack: ["Roboto-Black", "sans-serif"],
        pblackitalic: ["Roboto-BlackItalic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
