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
        'large-title': '2.625rem', // 42px
        'title-1': '2.125rem', // 34px
        'title-2': '1.75rem', // 28px
        'title-3': '1.5rem', // 24px
        headline: '1.25rem', // 20px
        body: '1rem', // 16px
        callout: '.9375rem', // 15px
        subhead: '.875rem', // 14px
        footnote: '.8125rem', // 13px
        'caption-1': '.75rem', // 12px
        'caption-2': '.6875rem', // 11px
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
