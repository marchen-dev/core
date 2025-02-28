import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { logger } from '~/global/consola.global'

@Injectable()
export class DataBaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
    logger.error('Disconnected from the database')
  }
}
