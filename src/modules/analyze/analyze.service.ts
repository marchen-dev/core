import { Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'

import { AnalyzeDto } from './analyze.dto'

@Injectable()
export class AnalyzeService {
  constructor(private readonly db: DataBaseService) {}

  async createAnalyze(analyze: AnalyzeDto) {
    return this.db.analyzes.create({
      data: analyze,
    })
  }
  getAnalyze(date?: string) {
    const query = this.db.analyzes.findMany({
      where: {
        created: {
          gte: date ? new Date(date) : new Date(),
        },
      },
    })
    return query
  }

  async getLastWeekAnalyze() {
    // 计算一周前的日期
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    return this.db.analyzes.findMany({
      where: {
        created: {
          gte: lastWeek,
        },
      },
      orderBy: {
        created: 'desc',
      },
    })
  }
}
