/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "login-gray": "#302F2F",
        "black-filter": "#282020",
        "red-bordo": "#4C0101",
        "input-gray": "#737373",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
