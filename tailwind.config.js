/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'spacing': 'margin, padding',
      },
      borderColor: {
        'semi-transparent': 'rgba(255, 255, 255, 0.17)',
      },
      backgroundColor: {
        'blue-grey': '#6274A2',
        'semi-transparent': 'rgba(255, 255, 255, 0.11)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(90deg, #8861ff, #9a91ff 33.33%, #7F9DF5, #6aacee, #55b4de, #28c2d9, #22d1d2, #42e0c1, #6cdc9f, #97e880, #c4e264, #e7d325, #ebbf39, #F59800, #FF8024, #FF6B4D, #f83258 66.67%, #b9046e)',
        'gradient-blue': 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(255, 255, 255, 0.7) 0.01%, rgba(0, 0, 0, 0.7) 100%)',
        'gradient-clear-day': 'linear-gradient(180deg, #E4D296 0%, #2778B3 31.25%, #2B5097 100%)',
        'gradient-clear-night': 'linear-gradient(180deg, #002D57 0%, #2D5E8B 100%)',
        'gradient-partly-cloudy-day': 'linear-gradient(180deg, #7FAFDC 0%, #245084 100%)',
        'gradient-partly-cloudy-night': 'linear-gradient(180deg, #18354B 0%, #35688C 100%)',
        'gradient-cloudy-day': 'linear-gradient(180deg, #6E82A1 0%, #374371 100%)',
        'gradient-cloudy-night': 'linear-gradient(180deg, #283143 0%, #4C5565 100%)',
        'gradient-haze-day': 'linear-gradient(180deg, #7A92A3 0%, #635C57 100%)',
        'gradient-haze-night': 'linear-gradient(180deg, #38424B 0%, #605C58 100%)',
        'gradient-fog-day': 'linear-gradient(180deg, #064E82 0%, #7D94A5 44.27%, #63798F 100%)',
        'gradient-fog-night': 'linear-gradient(180deg, #002844 0%, #616A72 44.27%, #627384 100%)',
        'gradient-snow-day': 'linear-gradient(180deg, #8095BD 0%, #53678F 100%)',
        'gradient-snow-night': 'linear-gradient(180deg, #334260 0%, #5B6987 100%)',
        'gradient-dust-day': 'linear-gradient(180deg, #B39E82 0%, #765D38 100%)',
        'gradient-dust-night': 'linear-gradient(180deg, #373C46 0%, #634E2E 100%)',
        'gradient-sand-day': 'linear-gradient(180deg, #BD9C5C 0%, #5C3B1D 100%)',
        'gradient-sand-night': 'linear-gradient(180deg, #332D25 0%, #60461F 100%)',
      },
    },
  },
  plugins: [],
};
