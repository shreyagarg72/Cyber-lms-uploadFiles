// tailwind.config.js

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customPurple: '#6d37ff',
      },
    },
  },
  variants: {
    extend: {
      // Enable group-hover variant
      backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      // Add more variants as needed
    },
  },
  plugins: [],
};
