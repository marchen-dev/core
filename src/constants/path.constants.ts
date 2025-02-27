import { homedir } from 'node:os'
import { join } from 'node:path'

import { cwd, isDev } from '~/global/env.global'

export const HOME = homedir()

export const DATA_DIR = isDev ? join(cwd, './tmp') : join(HOME, '.marchen')

export const LOG_DIR = join(DATA_DIR, 'log')
