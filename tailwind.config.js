/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f5f0e8', 100: '#e8dcc8', 200: '#d4b896', 300: '#b8905a',
          400: '#9a6e3a', 500: '#7a5228', 600: '#5c3a1a', 700: '#3d2510',
          800: '#1e1208', 900: '#0d0804',
        },
        paper: {
          50: '#fdfaf4', 100: '#faf4e8', 200: '#f5e9d0',
          300: '#edd8b0', 400: '#e0c48a',
        },
        accent: { red: '#c0392b', gold: '#d4a017', teal: '#1a7a6e' },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
