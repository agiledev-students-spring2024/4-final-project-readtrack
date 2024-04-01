/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        goodreads: {
          white: "#FFFCEC", //offwhite 
          lightcream: "#e9e5cd", //
          darkblue: "#003049",
          lightblue: "#669BBC",
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #003049, #669BBC)',
      },
    },
  },
  plugins: [],
};
