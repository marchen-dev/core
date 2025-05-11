import { BadRequestException, Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'

import { AiService } from '../ai/ai.service'
import { CategoryService } from '../category/category.service'
import { PostDto, PostPaginationDto } from './post.dto'

@Injectable()
export class PostService {
  constructor(
    private readonly db: DataBaseService,
    private readonly categoryServer: CategoryService,
    private readonly aiService: AiService,
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

    return this.db.posts.create({
      data: {
        ...post,
        summaryModel: await this.aiService.getCurrentModel(),
      },
    })
  }

  async deletePost(id: string) {
    const dbPost = await this.findPostById(id)
    if (!dbPost) {
      throw new BadRequestException('文章不存在')
    }
    return this.db.posts.delete({ where: { id } })
  }

  async getPostsByPagination(paginationDto: PostPaginationDto) {
    const { take, cursor, orderBy, category, search } = paginationDto
    const searchValue = search?.replaceAll('+', ' ')
    const dbPosts = await this.db.posts.findMany({
      take,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : undefined,
      where: {
        ...(category && {
          category: {
            slug: category,
          },
        }),
        ...(search && {
          title: {
            contains: searchValue,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: { created: orderBy },
      include: { category: true },
    })

    return dbPosts.map((post) => {
      if (!post.cover) {
        const hashSum = post.id
          .split('')
          .reduce((sum, char) => sum + char.charCodeAt(0), 0)
        const imageNumber = (hashSum % 10) + 1

        return {
          ...post,
          cover: `/${imageNumber}.jpg`,
        }
      }
      return post
    })
  }

  async getArchives() {
    const posts = await this.db.posts.findMany({
      select: {
        title: true,
        created: true,
        slug: true,
        id: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { created: 'desc' },
    })

    // 按年份分组文章
    const groupedByYear = posts.reduce((acc, post) => {
      const year = new Date(post.created).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    }, {})

    // 转换为数组格式，按年份降序排列
    const result = Object.keys(groupedByYear)
      .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
      .map((year) => ({
        year: Number.parseInt(year),
        posts: groupedByYear[year],
      }))

    return result
  }

  async getPostBySlug(categorySlug: string, postSlug: string) {
    const category = await this.categoryServer.findCategoryBySlug(categorySlug)
    if (!category) {
      throw new BadRequestException('分类不存在')
    }

    const post = await this.db.posts.findUnique({
      where: { slug: postSlug, categoryId: category.id },
      include: { category: true },
    })
    if (!post) {
      throw new BadRequestException('文章不存在')
    }
    await this.db.posts.update({
      where: { id: post.id },
      data: { read: post.read + 1 },
    })
    return post
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
  async getAllPosts() {
    return this.db.posts.findMany({
      select: {
        title: true,
        created: true,
        updated: true,
        slug: true,
        id: true,
        read: true,
        tags: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { created: 'desc' },
    })
  }

  async deleteMultiplePosts(ids: string[]) {
    const posts = await this.db.posts.findMany({ where: { id: { in: ids } } })
    if (posts.length !== ids.length) {
      throw new BadRequestException('文章不存在')
    }
    return this.db.posts.deleteMany({ where: { id: { in: ids } } })
  }

  async getPostById(id: string) {
    return this.db.posts.findUnique({ where: { id } })
  }

  async updatePost(id: string, post: PostDto) {
    const dbPost = await this.findPostById(id)
    if (!dbPost) {
      throw new BadRequestException('文章不存在')
    }
    return this.db.posts.update({
      where: { id },
      data: {
        ...post,
        summaryModel: await this.aiService.getCurrentModel(),
      },
    })
  }

  async likePost(id: string) {
    const post = await this.findPostById(id)
    if (!post) {
      throw new BadRequestException('文章不存在')
    }
    return this.db.posts.update({
      where: { id },
      data: { likes: post.likes + 1 },
    })
  }
}
