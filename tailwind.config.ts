import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    colors: {
      light: {
        text: {
          white: { 100: '#ffffff' },
          black: {
            100: '#000000',
            90: '#0c0c0c',
            80: '#2d2d2d',
            70: '#9e9e9e',
          },
          green: { 100: '#4BB34B'},
          red: { 100: '#B62222'}
        },
        bg: {
          white: { 100: '#ffffff' },
          black: {
            100: '#000000',
            90: '#0c0c0c',
            80: '#2d2d2d',
            70: '#9e9e9e',
          },
        },
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
