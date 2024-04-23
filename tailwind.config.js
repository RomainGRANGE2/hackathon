/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./components/**/*.vue",
    "./components/*.vue",
    "./pages/*.vue",
  ],
  theme: {
    extend: {
      fontFamily:{
        "redressed" : ['Redressed', ...defaultTheme.fontFamily.sans],
        "roboto" : ['Roboto', ...defaultTheme.fontFamily.sans],
        "rubik" : ['Rubik', ...defaultTheme.fontFamily.sans]
      },
      colors:{
        "primary": "#ba303d"
      }
    },
  },
  plugins: [],
}

