import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql', 'nuxt-lodash', "@nuxt/image"],
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

  nitro: {
    prerender: {
      // Prerender the index page
      routes: ['/'],
    },
  },

  typescript: {
    // Recommended: type check in dev and on build
    // typeCheck: true,
    shim: false,
  },
})