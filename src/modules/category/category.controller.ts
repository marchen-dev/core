import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'

import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

@Controller('category')
@ApiName
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: '获取分类列表',
    description: '返回所有分类的信息列表',
  })
  async getCategories() {
    return this.categoryService.categoriesInfo()
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: '创建分类',
    description: '添加新的分类项',
  })
  async createCategory(@Body() category: CategoryDto) {
    await this.categoryService.createCategory(category)
    return
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({
    summary: '更新分类',
    description: '更新指定的分类项',
  })
  async updateCategory(@Param('id') id: string, @Body() category: CategoryDto) {
    await this.categoryService.updateCategory(id, category)
    return
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({
    summary: '删除分类',
    description: '删除指定的分类项',
  })
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id)
    return
  }

  @Delete()
  @Auth()
  @ApiOperation({
    summary: '删除分类',
    description: '删除指定slug的分类项',
  })
  async deleteCategoryBySlug(@Query('slug') slug: string) {
    await this.categoryService.deleteCategoryBySlug(slug)
    return
  }
}
