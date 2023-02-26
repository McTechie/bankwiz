/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)']
      }
    },
  },
  plugins: [],
}