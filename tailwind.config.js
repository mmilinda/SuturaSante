/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf4f5',
          100: '#fbe8eb',
          200: '#f7d5da',
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
        },
        senegal: {
          green: '#00853f',
          yellow: '#fdef42',
          red: '#e31b23'
        }
      }
    },
  },
  plugins: [],
}
