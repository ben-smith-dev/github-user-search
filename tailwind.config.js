/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      animation: {
        'w-scale-in': 'w-scale-in 0.8s ease-in-out forwards',
        'h-shake': 'h-shake 300ms ease-in-out forwards',
        'scale-visibility-in': 'scale-visibility-in 100ms ease-in forwards',
        'scale-visibility-out': 'scale-visibility-out 100ms ease-in forwards'
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
        },
        'scale-visibility-in': {
          '0%': {transform: 'scale(0)', visibility: 'hidden'},
          '100%': {transform: 'scale(1)', visibility: 'visible'},
        },
        'scale-visibility-out': {
          '0%': {transform: 'scale(1)', visibility: 'visible'},
          '100%': {transform: 'scale(0)', visibility: 'hidden'},
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
}

