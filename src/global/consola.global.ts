import { LOG_DIR } from 'src/constants/path.constants'

import { createLogger, Logger } from '@innei/pretty-logger-nestjs'

const logger = createLogger({
  writeToFile: {
    loggerDir: LOG_DIR,
    errWriteToStdout: true,
  },
})
Logger.setLoggerInstance(logger)

export { logger as consola, logger }
