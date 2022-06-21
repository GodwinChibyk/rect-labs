/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteColor: "#ffffff",
        primaryColor: "#183059",
        primaryColorHover: "#183059f0",
        greenColor: "#5baa7d",
        redColor: "#f14336",
        grayColor: "#f1f1f1",
        grayColorLight:  "#f2f3f5",
        textColorLight: "#6c6c6c",
        textColorDark: "#292929"
      },
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
