/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F2F2F2',
        secondary: '#1A1A1A',
        accent: '#00FF00',
        tertiary: '#FF6700',
      },
      fontFamily: {
        headline: [
          'Migra-Regular',
          'Migra-Black',
          'Migra-Bold',
          'Migra-Extrabold',
          'Migra-Extralight',
          'Migra-Light',
          'Migra-Medium',
          'Migra-Semibold',
          'sans-serif',
        ],
        body: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'large-title': '3.15rem', // 50.4px
        'title-1': '2.55rem', // 40.8px
        'title-2': '2.1rem', // 33.6px
        'title-3': '1.8rem', // 28.8px
        headline: '1.5rem', // 24px
        body: '1.2rem', // 19.2px
        callout: '1.125rem', // 18px
        subhead: '1.05rem', // 16.8px
        footnote: '0.975rem', // 15.6px
        'caption-1': '0.9rem', // 14.4px
        'caption-2': '0.825rem', // 13.2px
      },

      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      lineHeight: {
        tight: 1.2,
        snug: 1.3,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
        3: '.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
      },
    },
  },
  plugins: [],
}
