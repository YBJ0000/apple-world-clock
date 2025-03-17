/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'apple-light': '#ffffff',
        'apple-dark': '#000000',
        'apple-gray': '#f5f5f7',
        'apple-gray-dark': '#1d1d1f',
        'apple-accent': '#0071e3',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}