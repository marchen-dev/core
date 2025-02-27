import { LoggerModule } from '@innei/pretty-logger-nestjs'
import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DataBaseModule } from './connections/database/database.module'

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
  imports: [DataBaseModule, LoggerModule, SentryModule],
})
export class AppModule {}
