import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'

import { CategoryService } from '../category/category.service'
import { PostDto, PostPaginationDto } from './post.dto'
import { PostService } from './post.service'

@Controller('posts')
@ApiName
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
  ) {}

  @Auth()
  @Post()
  @ApiOperation({
    summary: '创建文章',
    description: '添加新的文章。需要传入文章的标题、内容和其他相关信息。',
  })
  async createPost(@Body() post: PostDto) {
    await this.postService.createPost(post)
    return { message: '文章添加成功' }
  }

  @Get('/:categorySlug/:postSlug')
  @ApiOperation({
    summary: '获取文章',
    description: '通过分类和文章的 slug 获取文章。',
  })
  async getPost(
    @Param('categorySlug') categorySlug: string,
    @Param('postSlug') postSlug: string,
  ) {
    const post = await this.postService.getPostBySlug(categorySlug, postSlug)
    return post
  }

  @Get()
  @ApiOperation({
    summary: '获取文章列表',
    description: '分页获取文章列表，支持通过查询参数设置页码和每页条数。',
  })
  async getPostsByPagination(@Query() pagination: PostPaginationDto) {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    const [posts, categories] = await Promise.all([
      this.postService.getPostsByPagination(pagination),
      this.categoryService.categoriesInfo(),
    ])

    const nextId =
      posts.length === pagination.take ? posts.at(-1)?.id : undefined
    return {
      data: {
        posts,
        categories,
      },
      take: pagination.take,
      nextId,
    }
  }

  @Get('archives')
  @ApiOperation({
    summary: '获取归档列表',
    description: '获取归档列表。',
  })
  async getArchives() {
    return this.postService.getArchives()
  }

  @Auth()
  @Delete(':id')
  @ApiOperation({
    summary: '删除文章',
    description: '通过文章 ID 删除指定的文章。',
  })
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id)
    return { message: '文章删除成功' }
  }
}
