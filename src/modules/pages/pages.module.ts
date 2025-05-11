import { Module } from '@nestjs/common'

import { AiModule } from '../ai/ai.module'
import { PagesController } from './pages.controller'
import { PagesService } from './pages.service'

@Module({
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
  imports: [AiModule],
})
export class PagesModule {}
