/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {
      colors: {
        brand: '#0052FF',
      }
    },
  },
  plugins: [],
}