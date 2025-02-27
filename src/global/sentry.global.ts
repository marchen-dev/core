import Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

import { isDev } from './env.global'

export const registerSentry = () => {
  if (isDev) {
    return
  }
  // Ensure to call this before requiring any other modules!
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // Add our Profiling integration
      nodeProfilingIntegration(),
    ],

    // Add Tracing by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1,

    // Set sampling rate for profiling
    // This is relative to tracesSampleRate
    profilesSampleRate: 1,
  })
}
