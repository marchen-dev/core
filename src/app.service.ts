import { Inject, Injectable } from '@nestjs/common'

import { PrismaService } from './connections/database/prisma.service'

@Injectable()
export class AppService {
  constructor() {}

  @Inject(PrismaService)
  private readonly prisma: PrismaService
  async getHello() {
    const data = await this.prisma.users.findMany()
    return data
    // return 'Hello World!'
  }
}
