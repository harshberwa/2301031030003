/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <- important
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#9333EA",
        accent: "#F59E0B",
        background: "#F3F4F6",
        darkBackground: "#1F2937",
      },
    },
  },
  plugins: [],
};
