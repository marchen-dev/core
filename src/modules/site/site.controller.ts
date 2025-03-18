import { Body, Controller, Get, Patch } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'

import { SiteDto } from './site.dto'
import { SiteService } from './site.service'

@Controller('site')
@ApiName
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get()
  @ApiOperation({
    summary: '获取站点信息',
    description: '获取站点的基本信息和配置。',
  })
  async getSite() {
    return this.siteService.siteInfo()
  }

  @Patch()
  @Auth()
  @ApiOperation({
    summary: '更新站点信息',
    description: '更新站点的基本信息和配置，需要管理员权限。',
  })
  async updateSite(@Body() site: SiteDto) {
    await this.siteService.updateSite(site)
    return
  }
}
