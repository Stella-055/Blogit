/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← Important for Vite + React + TS
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")], // ← Needed for `prose`
};
