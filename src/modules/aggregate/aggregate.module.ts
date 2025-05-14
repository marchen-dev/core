import { Module } from '@nestjs/common'

import { AiModule } from '../ai/ai.module'
import { CategoryModule } from '../category/category.module'
import { FriendModule } from '../friend/friend.module'
import { PagesModule } from '../pages/pages.module'
import { PostModule } from '../post/post.module'
import { SiteModule } from '../site/site.module'
import { UserModule } from '../user/user.module'
import { AggregateController } from './aggregate.controller'
import { AggregateService } from './aggregate.service'

@Module({
  controllers: [AggregateController],
  providers: [AggregateService],
  imports: [
    UserModule,
    CategoryModule,
    PostModule,
    FriendModule,
    SiteModule,
    PagesModule,
    AiModule,
  ],
})
export class AggregateModule {}
