import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'

import { PageDto } from './pages.dto'
import { PagesService } from './pages.service'

@Controller('pages')
@ApiName
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @ApiOperation({
    summary: '获取页面列表',
    description: '获取页面列表。',
  })
  async getPages() {
    return this.pagesService.getPages()
  }

  @Post()
  @ApiOperation({
    summary: '创建页面',
    description: '创建页面。',
  })
  async createPage(@Body() page: PageDto) {
    return this.pagesService.createPage(page)
  }
}
