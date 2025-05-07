export const isDev = process.env.NODE_ENV == 'development'
export const cwd = process.cwd()

export const SENTRY_DSN = process.env.SENTRY_DSN
export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY
export const enableTurnstile = !!TURNSTILE_SECRET_KEY

export const k233 =
  '7b27d882f7e468e81989133d67d2340d4c71922d077b6d9acbea88f5ba6052296eb82f1a509d18a8962708ee9f46b849c7efdca96df77ac579638b5437b06879'
export const u233 =
  '906cc001bb4c776eb613e9f7ed98ebd0a10c73b992fe7c902739803c7bf6c7cb'
export const s233 = '58b0a2d5204f5afff6b01b9cfe7fbc35'
