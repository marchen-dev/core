import { Body, Controller, Get, Patch } from '@nestjs/common'

import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'

import { SiteDto } from './site.dto'
import { SiteService } from './site.service'

@Controller('site')
@ApiName
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get()
  async getSite() {
    return this.siteService.siteInfo()
  }

  @Patch()
  @Auth()
  async updateSite(@Body() site: SiteDto) {
    await this.siteService.updateSite(site)
    return
  }
}
