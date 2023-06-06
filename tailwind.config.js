/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      animation: {
        'w-scale-in': 'w-scale-in 1.2s ease-in-out forwards',
      },
      keyframes: {
        'w-scale-in': {
          '0%' : { width: '0%', 'flex-basis': '0' },
          '100%': { width: '100%', 'flex-basis': 'fit-content' }
        }
      },
    },
  },
  plugins: [],
}

