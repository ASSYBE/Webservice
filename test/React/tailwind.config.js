/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '8rem',
    },
    extend: {
      fontSize: {
        xs: '0.85rem',  // 12px
        sm: '1.1rem', // 14px
        base: '1.13rem',   // 16px
        lg: '1.225rem', // 18px
        xl: '1.3rem',  // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem', // 72px
      },
    },
    colors: {
      magenta: '#92348E',
      magentaLight: '#C652C1',
      orange: '#EA971A',
      gray: { light: '#F1F1F1', dark: '#BFBFBF', middle: '#A4A4A4' },
      white: '#FFFFFF',
      black: '#000',
      red: { normal: '#D30000', salmon: '#FA8072' },
      green: '#0D9B00',
      // 00FF00 
      response: '#EA971A',
      popupBV: { BG: '#92348E', text: '#FFFFFF', hover: '#BFBFBF' },
      popupBC: { BG: '#BFBFBF', text: '#000', scale: '50' },
    }
  },
  plugins: [],
}

