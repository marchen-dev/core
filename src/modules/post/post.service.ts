import { BadRequestException, Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'

import { CategoryService } from '../category/category.service'
import { PostDto, PostPaginationDto } from './post.dto'

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

  async getPostsByPagination(paginationDto: PostPaginationDto) {
    const { take, cursor, orderBy, category } = paginationDto
    const dbPosts = await this.db.posts.findMany({
      take,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : undefined,
      where: category
        ? {
            category: {
              slug: category,
            },
          }
        : undefined,
      orderBy: { created: orderBy },
      include: { category: true },
    })
    return dbPosts
  }

  async getPostsCount() {
    return this.db.posts.count()
  }

  async findPostById(id: string) {
    return this.db.posts.findUnique({ where: { id } })
  }

  async checkField(field?: string) {
    const post = await this.db.posts.findFirst({ include: { category: true } })
    if (post && field && !post[field]) {
      throw new BadRequestException(`post 表中不存在 ${field} 字段`)
    }
    return true
  }
}
