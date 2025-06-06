/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'rgb(var(--background))',
        card: 'rgb(var(--card))',
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          dark: 'rgb(68, 81, 222)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          dark: 'rgb(235, 87, 217)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          dark: 'rgb(101, 198, 212)',
        },
        success: 'rgb(var(--success))',
        warning: 'rgb(var(--warning))',
        error: 'rgb(var(--error))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'neon': '0 0 10px rgba(var(--primary), 0.5), 0 0 20px rgba(var(--primary), 0.2)',
        'neon-lg': '0 0 15px rgba(var(--primary), 0.5), 0 0 30px rgba(var(--primary), 0.3)',
      },
    },
  },
  plugins: [],
};