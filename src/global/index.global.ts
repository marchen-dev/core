import chalk from 'chalk'
import * as dotenv from 'dotenv'

import { registerSentry } from '~/global/sentry.global'

import { consola } from './consola.global'
import { cwd, isDev } from './env.global'

function registerEnv() {
  dotenv.config()
}

function registerGlobal() {
  Object.assign(globalThis, {
    isDev,
    consola,
    cwd,
    chalk,
  })
}

export const initializeApp = () => {
  registerEnv()
  registerSentry()
  registerGlobal()
}
