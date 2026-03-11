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
        'cl-card': '#111111',
        'cl-border': '#1a1a1a',
        'cl-cyan': '#06B6D4',
        'cl-cyan-light': '#22D3EE',
        'cl-muted': '#86868B',
        'cl-green': '#10B981',
        'cl-red': '#EF4444',
        'cl-orange': '#FF6B35',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
