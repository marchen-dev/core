import { Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { SiteModule } from '../site/site.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule, SiteModule],
  exports: [UserService],
})
export class UserModule {}
