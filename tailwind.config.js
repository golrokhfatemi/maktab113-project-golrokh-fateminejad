/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(167deg, rgba(95,150,154,0.913624824929972) 18%, rgba(52,138,142,0.8604035364145658) 41%, rgba(102,108,129,0.9024203431372549) 72%)',
      },
    },
  },
  plugins: [],
}

