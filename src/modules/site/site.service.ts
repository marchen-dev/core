import { BadRequestException, Injectable } from '@nestjs/common'

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

  async initlizeSite() {
    if (await this.db.site.findFirst()) {
      throw new BadRequestException('站点信息已经初始化')
    }
    return this.db.site.create({
      data: {
        title: 'SuemorのBlog',
        description: '所谓自由就是可以说二加二等于四的自由',
        keywords: ['Blog'],
        favicon: 'https://github.com/suemor233.png',
      },
    })
  }
}
