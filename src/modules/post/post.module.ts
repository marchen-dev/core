import { Module } from '@nestjs/common'

import { AiModule } from '../ai/ai.module'
import { CategoryModule } from '../category/category.module'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [CategoryModule, AiModule],
  exports: [PostService],
})
export class PostModule {}
