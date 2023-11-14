/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './Screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './navigator/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        grey_300: '#DBE1E7',
        border_orange: '#F39206',
        status_bar: '#E2E2E2',
        bgWhite: '#fff',
      },
    },
  },
  plugins: [],
};
