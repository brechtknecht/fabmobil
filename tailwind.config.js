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
        purple: '#DDBBFC',
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
        'large-title': [
          '3.15rem',
          {
            sm: '3.5rem',
            md: '3.85rem',
            lg: '4.2rem',
            xl: '4.55rem',
            '2xl': '4.9rem',
          },
        ],
        'title-1': [
          '2.55rem',
          {
            sm: '2.9rem',
            md: '3.25rem',
            lg: '3.6rem',
            xl: '3.95rem',
            '2xl': '4.3rem',
          },
        ],
        'title-2': [
          '2.1rem',
          {
            sm: '2.45rem',
            md: '2.8rem',
            lg: '3.15rem',
            xl: '3.5rem',
            '2xl': '3.85rem',
          },
        ],
        'title-3': [
          '1.8rem',
          {
            sm: '2.15rem',
            md: '2.5rem',
            lg: '2.85rem',
            xl: '3.2rem',
            '2xl': '3.55rem',
          },
        ],
        headline: [
          '1.5rem',
          {
            sm: '1.85rem',
            md: '2.2rem',
            lg: '2.55rem',
            xl: '2.9rem',
            '2xl': '3.25rem',
          },
        ],
        body: [
          '1.2rem',
          {
            sm: '1.55rem',
            md: '1.9rem',
            lg: '2.25rem',
            xl: '2.6rem',
            '2xl': '2.95rem',
          },
        ],
        callout: [
          '1.125rem',
          {
            sm: '1.475rem',
            md: '1.825rem',
            lg: '2.175rem',
            xl: '2.525rem',
            '2xl': '2.875rem',
          },
        ],
        subhead: [
          '1.05rem',
          {
            sm: '1.4rem',
            md: '1.75rem',
            lg: '2.1rem',
            xl: '2.45rem',
            '2xl': '2.8rem',
          },
        ],
        footnote: [
          '0.975rem',
          {
            sm: '1.325rem',
            md: '1.675rem',
            lg: '2.025rem',
            xl: '2.375rem',
            '2xl': '2.725rem',
          },
        ],
        'small-text': [
          '0.9rem',
          {
            sm: '1.25rem',
            md: '1.6rem',
            lg: '1.95rem',
            xl: '2.3rem',
            '2xl': '2.65rem',
          },
        ],
      },
      fontWeight: {
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
        tight: [
          '1.2',
          { sm: '1.25', md: '1.3', lg: '1.35', xl: '1.4', '2xl': '1.45' },
        ],
        snug: [
          '1.375',
          {
            sm: '1.425',
            md: '1.475',
            lg: '1.525',
            xl: '1.575',
            '2xl': '1.625',
          },
        ],
        normal: [
          '1.5',
          { sm: '1.55', md: '1.6', lg: '1.65', xl: '1.7', '2xl': '1.75' },
        ],
        relaxed: [
          '1.625',
          {
            sm: '1.675',
            md: '1.725',
            lg: '1.775',
            xl: '1.825',
            '2xl': '1.875',
          },
        ],
        loose: [
          '2',
          { sm: '2.05', md: '2.1', lg: '2.15', xl: '2.2', '2xl': '2.25' },
        ],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
      },
    },
  },
  variants: {},
  plugins: [],
}
