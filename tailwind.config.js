// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#4ECDC4',
        tertiary: '#FF6B6B',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        background: {
          primary: '#F5F5F5',
          secondary: '#ECECEC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
