/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderColor: {
        'semi-transparent': 'rgba(255, 255, 255, 0.17)',
      },
      backgroundColor: {
        'blue-grey': '#6274A2',
        'semi-transparent': 'rgba(255, 255, 255, 0.17)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-blue': 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(255, 255, 255, 0.7) 0.01%, rgba(0, 0, 0, 0.7) 100%)',
      },
    },
  },
  plugins: [],
};
