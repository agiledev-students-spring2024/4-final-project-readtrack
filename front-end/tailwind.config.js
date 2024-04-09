/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        goodreads: {
          white: "#FFFFFF",
          lightgray: "#D9D9D9",
          black: "#000000",
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #003049, #669BBC)',
      },
      outline: {
        lightgray: '2px solid #D9D9D9',
      }

    },
  },
  plugins: [],
};
