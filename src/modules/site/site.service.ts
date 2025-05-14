import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { DataBaseService } from '~/connections/database/database.service'

import { SiteDto } from './site.dto'

@Injectable()
export class SiteService {
  constructor(private readonly db: DataBaseService) {}
  async updateSite(site: SiteDto) {
    const dbSite = await this.db.site.findFirst()
    return this.db.site.update({
      data: site,
      where: {
        id: dbSite?.id,
      },
    })
  }

  siteInfo() {
    return this.db.site.findFirst()
  }

  async initlizeSite(url: string, tx: Prisma.TransactionClient) {
    if (await tx.site.findFirst()) {
      throw new BadRequestException('站点信息已经初始化')
    }
    return tx.site.create({
      data: {
        title: 'SuemorのBlog',
        description: '所谓自由就是可以说二加二等于四的自由',
        keywords: ['Blog'],
        favicon: 'https://github.com/suemor233.png',
        url,
      },
    })
  }
}
