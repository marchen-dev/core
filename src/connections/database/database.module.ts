import { Global, Module } from '@nestjs/common'

import { DataBaseService } from './database.service'

@Module({
  providers: [DataBaseService],
  exports: [DataBaseService],
})
@Global()
export class DataBaseModule {}
