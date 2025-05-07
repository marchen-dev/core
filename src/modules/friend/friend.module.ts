import { Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { FriendController } from './friend.controller'
import { FriendService } from './friend.service'

@Module({
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
  imports: [AuthModule],
})
export class FriendModule {}
