import { BadRequestException, Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'

import { PageDto } from './pages.dto'

@Injectable()
export class PagesService {
  constructor(private readonly db: DataBaseService) {}

  getPages() {
    return this.db.pages.findMany({
      orderBy: {
        order: 'asc',
      },
    })
  }

  async createPage(page: PageDto) {
    const exist = await this.db.pages.findUnique({
      where: {
        slug: page.slug,
      },
    })

    if (exist) throw new BadRequestException('页面已存在')
    return this.db.pages.create({
      data: page,
    })
  }
}
