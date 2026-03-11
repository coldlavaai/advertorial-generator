import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cl-bg': '#030305',
        'cl-bg-alt': '#000000',
        'cl-surface': '#1D1D1F',
        'cl-cyan': '#06B6D4',
        'cl-cyan-light': '#22D3EE',
        'cl-cyan-glow': '#00D4FF',
        'cl-gold': '#C9A962',
        'cl-gold-light': '#D4B76E',
        'cl-white': '#FFFFFF',
        'cl-text-secondary': '#E5E7EB',
        'cl-muted': '#86868B',
        'cl-border': '#424245',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
