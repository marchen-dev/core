import { Module } from '@nestjs/common'

import { EncryptionController } from './encryption.controller'
import { EncryptionService } from './encryption.service'

@Module({
  controllers: [EncryptionController],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
