import { BadRequestException, Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'
import { PaginationDto } from '~/shared/dto/pagination.dto'

import { CategoryService } from '../category/category.service'
import { PostDto } from './post.dto'

@Injectable()
export class PostService {
  constructor(
    private readonly db: DataBaseService,
    private readonly categoryServer: CategoryService,
  ) {}

  async createPost(post: PostDto) {
    const dbPost = await this.db.posts.findUnique({
      where: { slug: post.slug },
    })
    if (dbPost) {
      throw new BadRequestException('文章 slug 已存在')
    }

    const category = await this.categoryServer.findCategoryById(post.categoryId)

    if (!category) {
      throw new BadRequestException('categoryId 不存在')
    }

    return this.db.posts.create({ data: post })
  }

  async deletePost(id: string) {
    const dbPost = await this.findPostById(id)
    if (!dbPost) {
      throw new BadRequestException('文章不存在')
    }
    return this.db.posts.delete({ where: { id } })
  }

  async getPostsByPagination(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto
    const skip = (page - 1) * pageSize
    const take = pageSize
    const dbPosts = await this.db.posts.findMany({
      skip,
      take,
      orderBy: { created: 'desc' },
      include: { category: true },
    })
    return dbPosts
  }

  async findPostById(id: string) {
    return this.db.posts.findUnique({ where: { id } })
  }
}
