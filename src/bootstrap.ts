import { Logger } from '@innei/pretty-logger-nestjs'
import { NestFactory } from '@nestjs/core'

import { appConfig } from './app.config'
import { AppModule } from './app.module'

export async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useLogger(app.get(Logger))
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => callback(null, origin || ''),
  })
  await app.listen(appConfig.app.port)
}
