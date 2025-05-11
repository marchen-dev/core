import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiParam } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'

import { DeleteMultiplePagesDto, PageDto, UpdatePageDto } from './pages.dto'
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

  @Get('slug/:slug')
  @ApiOperation({
    summary: '通过别名获取页面',
    description: '通过页面别名获取页面详情。每次访问会自动增加阅读量。',
  })
  @ApiParam({
    name: 'slug',
    description: '页面别名',
    type: String,
  })
  async getPageBySlug(@Param('slug') slug: string) {
    return this.pagesService.getPageBySlug(slug)
  }

  @Get(':id')
  @ApiOperation({
    summary: '获取单个页面',
    description: '通过ID获取单个页面详情。每次访问会自动增加阅读量。',
  })
  @ApiParam({
    name: 'id',
    description: '页面ID',
    type: String,
  })
  async getPageById(@Param('id') id: string) {
    return this.pagesService.getPageById(id)
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: '创建页面',
    description: '创建页面。',
  })
  async createPage(@Body() page: PageDto) {
    await this.pagesService.createPage(page)
    return
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({
    summary: '更新页面',
    description: '通过ID更新页面信息。',
  })
  @ApiParam({
    name: 'id',
    description: '页面ID',
    type: String,
  })
  async updatePage(@Param('id') id: string, @Body() updateData: UpdatePageDto) {
    await this.pagesService.updatePage(id, updateData)
    return { message: '页面更新成功' }
  }

  @Auth()
  @Delete()
  @ApiOperation({
    summary: '批量删除页面',
    description: '通过提供一个包含页面 ID 的数组来一次性删除多个页面。',
  })
  async deleteMultiplePages(
    @Body() deleteMultiplePagesDto: DeleteMultiplePagesDto,
  ) {
    const { ids } = deleteMultiplePagesDto
    await this.pagesService.deleteMultiplePages(ids)
    return
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({
    summary: '删除页面',
    description: '通过ID删除页面。',
  })
  @ApiParam({
    name: 'id',
    description: '页面ID',
    type: String,
  })
  async deletePage(@Param('id') id: string) {
    await this.pagesService.deletePage(id)
    return
  }

  @Post('like/:id')
  @ApiOperation({
    summary: '点赞页面',
    description: '通过ID点赞页面。',
  })
  async likePage(@Param('id') id: string) {
    await this.pagesService.likePage(id)
    return
  }
}
