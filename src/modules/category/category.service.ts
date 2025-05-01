import { BadRequestException, Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'

import { CategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly db: DataBaseService) {}
  async createCategory(category: CategoryDto) {
    const { name, slug } = category
    const dbCategory = await this.db.categories.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    })
    if (dbCategory) {
      throw new BadRequestException('分类名称或者路径已存在')
    }
    return this.db.categories.create({
      data: {
        name,
        slug,
      },
    })
  }

  async categoriesInfo() {
    const categories = await this.db.categories.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    })

    return categories
  }

  findCategoryById(id: string) {
    if (!id) {
      return
    }
    return this.db.categories.findUnique({
      where: { id },
    })
  }

  findCategoryBySlug(slug: string) {
    if (!slug) {
      return
    }
    return this.db.categories.findUnique({
      where: { slug },
    })
  }

  async updateCategory(id: string, category: CategoryDto) {
    const dbCategory = await this.findCategoryById(id)
    if (!dbCategory) {
      throw new BadRequestException('分类不存在')
    }
    return this.db.categories.update({
      where: { id },
      data: category,
    })
  }
  async deleteCategory(id: string) {
    const dbCategory = await this.findCategoryById(id)
    if (!dbCategory) {
      throw new BadRequestException('分类不存在')
    }

    const dbPost = await this.db.posts.findFirst({
      where: { categoryId: id },
    })

    if (dbPost) {
      throw new BadRequestException(
        '分类下存在文章，请先删除文章后，再删除分类',
      )
    }

    return this.db.categories.delete({ where: { id } })
  }

  async deleteCategoryBySlug(slug: string) {
    const dbCategory = await this.findCategoryBySlug(slug)
    if (!dbCategory) {
      throw new BadRequestException('分类不存在')
    }
    return this.db.categories.delete({ where: { slug } })
  }
}
