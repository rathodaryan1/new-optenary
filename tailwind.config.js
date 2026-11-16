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
          cyanGlow: '#22d3ee',
          purple: '#a855f7',
          violet: '#8b5cf6',
          blue: '#3b82f6',
          blueElectric: '#2563eb',
        },
        navy: {
          base: '#030712',
          deep: '#040817',
          card: '#080d22',
          cardHover: '#0d163a',
          border: '#151f42',
          borderLight: '#1f2e63',
          muted: '#8493a8',
        },
        dark: {
          bg: '#030408', // deep dark with subtle navy tone
          card: '#080b14', // obsidian navy card background
          border: '#141824', // charcoal navy border
          muted: '#8e9aa8', // cool slate muted text
          light: '#141a2e', // lighter hover
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'marquee-forward': 'marqueeForward 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
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
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(30px)' },
          '50%': { opacity: '0.8', filter: 'blur(45px)' },
        }
      }
    },
  },
  plugins: [],
}
