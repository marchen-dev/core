export const isDev = process.env.NODE_ENV == 'development'
export const cwd = process.cwd()

export const SENTRY_DSN = process.env.SENTRY_DSN
export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY
export const enableTurnstile = !!TURNSTILE_SECRET_KEY

export const MODEL_BASE_URL = process.env.MODEL_BASE_URL
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
