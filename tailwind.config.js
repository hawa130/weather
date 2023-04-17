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
        'gradient-linear': 'linear-gradient(90deg, #8861ff, #9a91ff 33.33%, #7F9DF5, #6aacee, #55b4de, #28c2d9, #22d1d2, #42e0c1, #6cdc9f, #97e880, #c4e264, #e7d325, #ebbf39, #F59800, #FF8024, #FF6B4D, #f83258 66.67%, #b9046e)',
        'gradient-blue': 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(255, 255, 255, 0.7) 0.01%, rgba(0, 0, 0, 0.7) 100%)',
      },
    },
  },
  plugins: [],
};
