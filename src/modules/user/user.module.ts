import { Module } from '@nestjs/common'

import { AiModule } from '../ai/ai.module'
import { AuthModule } from '../auth/auth.module'
import { SiteModule } from '../site/site.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule, SiteModule, AiModule],
  exports: [UserService],
})
export class UserModule {}
