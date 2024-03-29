/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        goodreads: {
          white: "#ffffff",
          lightcream: "#e9e5cd",
          brown: "#75420e",
          darkbrown: "#553b08",
          gray: "#aaaaaa",
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #ffffff,#eeeeee, #e9e5cd)',
      },
    },
  },
  plugins: [],
};
