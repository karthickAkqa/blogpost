module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js", "./slices/**/*.js"], 
  darkMode: "class",
  variants: {
    extend: {},
  },
  theme: {
    extend: {},
    fontFamily: {
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif:
        '"Libre Baskerville", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
    extend: {},
  },
  
  colors: {
    'blue': '#1fb6ff',
    'purple': '#7e5bef', 
    'pink': '#ff49db',
    'orange': '#ff7849',
    'green': '#13ce66',
    'yellow': '#ffc82c',
    'gray-dark': '#273444',
    'gray': '#8492a6', 
    'gray-light': '#d3dce6',
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

