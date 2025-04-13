import { LoggerModule } from '@innei/pretty-logger-nestjs'
import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ExceptionsFilter } from './common/filters/exception.filter'
import { ResponseInterceptor } from './common/interceptors/interceptors.interceptor'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { DataBaseModule } from './connections/database/database.module'
import { AggregateModule } from './modules/aggregate/aggregate.module'
import { AiModule } from './modules/ai/ai.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { FriendModule } from './modules/friend/friend.module'
import { PostModule } from './modules/post/post.module'
import { SiteModule } from './modules/site/site.module'
import { UserModule } from './modules/user/user.module'

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  imports: [
    DataBaseModule,
    LoggerModule,
    SentryModule,
    UserModule,
    AuthModule,
    AggregateModule,
    FriendModule,
    PostModule,
    CategoryModule,
    SiteModule,
    AiModule,
  ],
})
export class AppModule {}
