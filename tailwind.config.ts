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
      1: {
        text: {
          white: { 100: '#ffffff' },
          black: {
            100: '#000000',
            90: '#0c0c0c',
            80: '#2d2d2d',
            70: '#9e9e9e',
            60: '#777777',
            50: '#636363',
          },
          green: { 100: '#4bb34b' },
          red: { 100: '#b62222' },
          colored: { 100: '#5763d0' },
        },
        bg: {
          white: { 100: '#ffffff' },
          black: {
            100: '#000000',
            90: '#0c0c0c',
            80: '#2d2d2d',
            70: '#9e9e9e',
            60: '#777777',
            50: '#636363',
          },
          active_b: {100: '#161616'},
          blue: { 100: '#389ef2'},
          purple: { 100: '#725bda'}
        },
      },
    },
    extend: {
      backgroundImage: {
        '1-gradient': 'linear-gradient(152.48deg, rgb(137, 198, 255) -36.244%, rgb(54, 51, 208) 71.781%)',
        'dark-gradient': 'linear-gradient(152.48deg, rgb(54, 51, 208) -36.244%, rgb(137, 198, 255) 71.781%)',
      },
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
