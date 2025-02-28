import { createLogger, Logger } from '@innei/pretty-logger-nestjs'

import { LOG_DIR } from '~/constants/path.constants'

const logger = createLogger({
  writeToFile: {
    loggerDir: LOG_DIR,
    errWriteToStdout: true,
  },
})
Logger.setLoggerInstance(logger)

export { logger as consola, logger }
