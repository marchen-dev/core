import { Module } from '@nestjs/common'

import { UserModule } from '../user/user.module'
import { AggregateController } from './aggregate.controller'
import { AggregateService } from './aggregate.service'

@Module({
  controllers: [AggregateController],
  providers: [AggregateService],
  imports: [UserModule],
})
export class AggregateModule {}
