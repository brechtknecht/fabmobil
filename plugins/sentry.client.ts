import { defineNuxtPlugin } from '#app'
import * as pkg from '~/package.json'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

export default defineNuxtPlugin((nuxtApp) => {
  const release = `fabmobil@${pkg.version}`
  const environment = nuxtApp.$config.ENV

  Sentry.init({
    dsn: 'https://31fc3c71fd330255efbed371245d2bea@o4505804679020544.ingest.sentry.io/4505804680527872',
    release,
    environment,
    integrations: [new Integrations.BrowserTracing()],
    sampleRate: 1,
    tracesSampleRate: 1,
  })
})
