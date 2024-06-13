/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "login-gray": "#3A3737",
        "black-filter": "#111010",
        "red-bordo": "#350A0A",
        "input-gray": "#737373",
        "white-text": "#E1E1E1",
        "border-red-hover": "#A90000",
        "border-red": "#730B0B",
        "card-gray": "#151515",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
