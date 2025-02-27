import { Inject, Injectable } from '@nestjs/common'

import { DataBaseService } from './connections/database/database.service'

@Injectable()
export class AppService {
  constructor() {}

  @Inject(DataBaseService)
  private readonly prisma: DataBaseService
  async getHello() {
    const data = await this.prisma.users.findMany()
    return data
    // return 'Hello World!'
  }
}
