import chalk from 'chalk'

import { Logger } from '@innei/pretty-logger-nestjs'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { appConfig } from './app.config'
import { AppModule } from './app.module'
import { logger } from './global/consola.global'
import { isDev } from './global/env.global'

export async function bootstrap() {
  const { docs, port, version } = appConfig.app

  const app = await NestFactory.create(AppModule, { bodyParser: false })
  app.useLogger(app.get(Logger))
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => callback(null, origin || ''),
  })

  app.setGlobalPrefix(isDev ? '' : `api/v${version}`)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Marchen')
    .setDescription('In development')
    .setVersion(version.toString())
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(docs, app, documentFactory)
  await app.listen(port, () => {
    logger.info('ENV:', process.env.NODE_ENV)
    logger.info(
      `Server is running on: ${chalk.yellow(`http://localhost:${port}`)}`,
    )
    logger.info(
      `Swagger is running on: ${chalk.yellow(`http://localhost:${port}/${docs}`)}`,
    )
    logger.success(`Startup time ${chalk.yellow(`${performance.now() | 0}ms`)}`)
  })
}
