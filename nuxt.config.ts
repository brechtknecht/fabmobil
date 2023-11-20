import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql', 'nuxt-lodash', '@nuxt/image'],
  css: ['@/assets/css/main.css'],

  publicRuntimeConfig: {
    ENV: process.env.ENV,
  },

  plugins: [{ src: '~/plugins/vue-video-player.ts', ssr: false }],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  kql: {
    auth: 'bearer',
    prefetch: {
      // Currently only used to infer the type of the `site` query
      kirbySite: siteQuery,
    },
    // Optionally, cache the queries on the server for an hour
    server: {
      // cache: true,
      // maxAge: 60 * 60,
    },
  },

  typescript: {
    // Recommended: type check in dev and on build
    // typeCheck: true,
    shim: false,
  },

  head: {
    title: 'Fabmobil', // You can have your site title here
    meta: [
      // Existing meta tags...

      // Add your new meta tags here
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      // Existing link tags...

      // Add your new link tags here
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  },
})
