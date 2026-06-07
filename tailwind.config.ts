import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#02020a',
        surface: '#09091a',
        'surface-2': '#0e0e20',
        primary: { DEFAULT: '#6366f1', dim: '#4f46e5' },
        secondary: '#8b5cf6',
        accent: '#06b6d4',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 40px rgba(99,102,241,0.25)',
        'glow-lg': '0 0 80px rgba(99,102,241,0.3)',
        card: '0 24px 64px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
