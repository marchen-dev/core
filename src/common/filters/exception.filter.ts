import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

import { logger } from '~/global/consola.global'

type MatchError = {
  readonly message: string | string[]
  readonly status: number
}
@Catch()
export class ExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    if (request.method === 'OPTIONS') return response.status(204).send()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      (exception as any)?.response?.message ??
      (exception as MatchError)?.message ??
      '服务端错误'
    logger.error(`[${request.method}] ${request.url} ${status} ${message}`)
    return response.status(status).type('application/json').send({
      status,
      message,
    })
  }
}
