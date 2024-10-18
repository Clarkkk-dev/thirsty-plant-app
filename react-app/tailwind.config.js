/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        pulse: 'pulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
