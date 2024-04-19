/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        cormorantGaramondMedium: ["Cormorant_Garamond_Medium", "sans-serif"],
        cormorantGaramondSemibold: [
          "Cormorant_Garamond_Semibold",
          "sans-serif",
        ],
        pTSerifCaption: ["PT_Serif_Caption", "sans-serif"],
      },
      colors: {
        goodreads: {
          white: "#FFFFFF",
          lightgray: "#D9D9D9",
          black: "#000000",
          linegray: "#AAA8A8",
          red: "#e63946"
        },
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #003049, #669BBC)",
      },
      outline: {
        lightgray: "2px solid #D9D9D9",
      },
    },
  },
  plugins: [],
};
