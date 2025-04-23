/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: '8rem',
    },
    extend: {},
    colors: {
      magenta: '#92348E',
      orange: '#EA971A',
      gray: { light: '#EBEBEB', dark: '#BFBFBF', middle:'#A4A4A4' },
      white: '#FFFFFF',
      black: '#000',
      red: { normal: '#D30000', salmon: '#FA8072' }
    }
  },
  plugins: [],
}

