const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    borderRadius: {
      ...defaultTheme.borderRadius,
    },
    fontFamily: {
      sans: ["Anton", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        purple: {
          50: "#D7BCE2",
          100: "#CEAEDB",
          200: "#BD92CF",
          300: "#AC75C2",
          400: "#9B59B6",
          500: "#7D4295",
          600: "#5C316E",
          700: "#3C1F47",
          800: "#1B0E20",
          900: "#000000",
        },
        darkblue: {
          50: "#686DAF",
          100: "#5B60A8",
          200: "#4C508E",
          300: "#3D4173",
          400: "#2F3259",
          500: "#21233E",
          600: "#0E0E19",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        gold: {
          50: "#FCF3CA",
          100: "#FBEFB6",
          200: "#F9E790",
          300: "#F6DE69",
          400: "#F4D543",
          500: "#F2CD1C",
          600: "#CAA90C",
          700: "#957D09",
          800: "#605106",
          900: "#2B2402",
        },
        teal: {
          50: "#9FF1E0",
          100: "#8DEEDB",
          200: "#6AE9CF",
          300: "#46E3C4",
          400: "#23DEB9",
          500: "#1CBC9C",
          600: "#158B73",
          700: "#0D5A4B",
          800: "#062A22",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
