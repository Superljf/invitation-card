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
        'accent': { DEFAULT: '#e11d48', hover: '#be123c' },
      },
      fontFamily: {
        serif: ['"Source Han Serif CN"', '"Noto Serif SC"', 'SimSun', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'glow': '0 0 20px -5px rgba(225,29,72,0.3)',
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
  },
  plugins: [],
}
