import { Controller } from '@nestjs/common'

import { EncryptionService } from './encryption.service'

@Controller('encryption')
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}
}
