/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      san: ['Rubik', 'sans-serif']
    },
    extend: {
      fontFamily:{
        heading: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}