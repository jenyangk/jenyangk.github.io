export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    fontFamily: {
      sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
    },
    extend: {
      fontFamily: {
        barcode: ['"Libre Barcode 39"', 'monospace'],
      }
    },
  },
  plugins: [],
};
