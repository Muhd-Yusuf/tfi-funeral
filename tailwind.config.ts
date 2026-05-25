import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#030B1A',
          surface: '#0A1628',
          card: 'rgba(12, 25, 50, 0.6)',
        },
        primary: {
          DEFAULT: '#0088FF',
          light: '#00D4FF',
          dark: '#0055CC',
        },
        secondary: {
          DEFAULT: '#00C9A7',
          light: '#00FFD1',
        },
        gold: '#FFB547',
        glass: {
          bg: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.06)',
        },
        admin: {
          bg: '#0F1729',
          card: '#1A2332',
          border: '#2A3545',
          accent: '#3B82F6',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 20s ease-in-out infinite 7s',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'pulse-ring': 'pulse-ring 3s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '75%': { transform: 'translate(20px, 10px) scale(1.02)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)' },
          '50%': { boxShadow: '0 4px 40px rgba(37, 211, 102, 0.6), 0 0 0 10px rgba(37, 211, 102, 0.1)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        '2xl': '40px',
      },
    },
  },
  plugins: [],
}

export default config
