import * as crypto from 'node:crypto'

import { Injectable } from '@nestjs/common'

import { s233 } from '~/global/env.global'

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc'
  private readonly key: Buffer
  private readonly iv: Buffer

  constructor() {
    // 从环境变量获取 secretKey
    const secretKey = s233
    if (!secretKey || secretKey.length < 32) {
      throw new Error('ENCRYPTION_SECRET_KEY must be at least 32 characters')
    }
    this.key = Buffer.from(secretKey).slice(0, 32)
    this.iv = Buffer.alloc(16, 0)
  }

  decryptKey(encryptedText: string): string {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.key,
        this.iv,
      )
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    } catch {
      throw new Error('Decryption failed: Invalid key or ciphertext')
    }
  }
}
