/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#10b981', // primary emerald
          orangeDark: '#059669', // dark emerald hover
          orangeLight: '#8b5cf6', // soft violet accent
          
          emerald: '#10b981',
          emeraldDark: '#059669',
          cyan: '#06b6d4',
          purple: '#a855f7',
          violet: '#8b5cf6',
        },
        dark: {
          bg: '#030303', // deep obsidian black
          card: '#09090b', // obsidian card background
          border: '#141418', // charcoal border
          muted: '#8e9aa8', // cool slate muted text
          light: '#18181b', // lighter graphite/charcoal hover
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee-forward': 'marqueeForward 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marqueeForward: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
