import { Module } from '@nestjs/common'

import { EncryptionModule } from '../encryption/encryption.module'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'

@Module({
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
  imports: [EncryptionModule],
})
export class AiModule {}
