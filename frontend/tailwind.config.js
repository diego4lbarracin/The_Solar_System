/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "solar-gold": "#fbbf24",
        "solar-orange": "#f59e0b",
        "space-black": "#000000",
        "space-deep": "#0a0a1a",
        "star-white": "#ffffff",
        "nebula-blue": "#1e3a5f",
      },
    },
  },
  plugins: [],
};
