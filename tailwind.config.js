/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zhong-red': { DEFAULT: '#8B0000', light: '#A40000' },
        'zhong-gold': { DEFAULT: '#D4AF37', light: '#F5D26B' },
      },
      fontFamily: {
        serif: ['"Source Han Serif CN"', '"Noto Serif SC"', 'SimSun', 'serif'],
      },
    },
  },
  plugins: [],
}
