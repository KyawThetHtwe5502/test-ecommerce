/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center : true
    },
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