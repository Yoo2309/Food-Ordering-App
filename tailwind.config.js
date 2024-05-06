/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F8FBFF",
          100: "#E5F0FF",
          200: "#B8D4FE",
          300: "#78A6EC",
          400: "#5690E7",
          500: "#347AE2",
          600: "#2B66BC",
          700: "#235197",
          800: "#1A3D71",
          900: "#062046",
        },
        gray: {
          50: "#ECEFF4",
          100: "#E0E5ED",
          200: "#ABB7C9",
          300: "#96A0B5",
          400: "#7C829C",
          500: "#73778B",
          600: "#64748B",
          700: "#4C4F5F",
          800: "#343744",
          900: "#292C38",
        },
        white: "#FFFFFF",
        red: "#C85C54",
        yellow: "#FDB92C",
        purple: "#A55EFF",
        green: "#27AE60",
        "red-50": "#FFEFEB",
        "yellow-50": "#FDF4E0",
        "purple-50": "#F5EDFF",
      },
    },
  },
  plugins: [],
};
