/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      animation: {
        'w-scale-in': 'w-scale-in 0.8s ease-in-out forwards',
        'h-shake': 'h-shake 300ms ease-in-out forwards'
      },
      keyframes: {
        'w-scale-in': {
          '0%' : { width: '0%', 'flex-basis': '0' },
          '100%': { width: '100%', 'flex-basis': 'fit-content' }
        },
        'h-shake': {
          '0%': { transform: 'translateX(0rem)' },
          '5%': { transform: 'translateX(0.5rem)' },
          '10%': { transform: 'translateX(-0.5rem)' },
          '20%': { transform: 'translateX(0.5rem)' },
          '45%': { transform: 'translateX(-0.5rem)' },
          '70%': { transform: 'translateX(0.5rem)' },
          '100%': { transform: 'translateX(0rem)' },
        }
      },
    },
  },
  plugins: [],
}

