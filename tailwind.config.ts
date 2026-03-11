import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cl-bg': '#030305',
        'cl-surface': '#1D1D1F',
        'cl-card': 'rgba(0,0,0,0.6)',
        'cl-border': 'rgba(6,182,212,0.2)',
        'cl-border-subtle': 'rgba(255,255,255,0.04)',
        'cl-cyan': '#06B6D4',
        'cl-cyan-light': '#22D3EE',
        'cl-cyan-glow': '#00D4FF',
        'cl-gold': '#C9A962',
        'cl-muted': '#86868B',
        'cl-text': 'rgba(255,255,255,0.6)',
        'cl-text-secondary': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        'cl': '8px',
      },
    },
  },
  plugins: [],
};
export default config;
