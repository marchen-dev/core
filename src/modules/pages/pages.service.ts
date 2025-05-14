import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'

import { AiService } from '../ai/ai.service'
import { PageDto, UpdatePageDto } from './pages.dto'

@Injectable()
export class PagesService {
  constructor(
    private readonly db: DataBaseService,
    private readonly aiService: AiService,
  ) {}

  getPages() {
    return this.db.pages.findMany({
      orderBy: {
        created: 'asc',
      },
      omit: {
        summaryModel: true,
        content: true,
        summary: true,
      },
    })
  }

  async getPageById(id: string) {
    const page = await this.db.pages.findUnique({
      where: { id },
    })

    if (!page) {
      throw new NotFoundException(`ID为 ${id} 的页面不存在`)
    }

    // 自动增加阅读量
    await this.db.pages.update({
      where: { id },
      data: { read: page.read + 1 },
    })

    // 返回更新后的页面
    return {
      ...page,
      read: page.read + 1,
    }
  }

  async getPageBySlug(slug: string) {
    const page = await this.db.pages.findUnique({
      where: { slug },
    })

    if (!page) {
      throw new NotFoundException(`别名为 ${slug} 的页面不存在`)
    }

    // 自动增加阅读量
    await this.db.pages.update({
      where: { id: page.id },
      data: { read: page.read + 1 },
    })

    // 返回更新后的页面
    return {
      ...page,
      read: page.read + 1,
    }
  }

  async createPage(page: PageDto) {
    const exist = await this.db.pages.findUnique({
      where: {
        slug: page.slug,
      },
    })

    if (exist) throw new BadRequestException('页面已存在')
    return this.db.pages.create({
      data: {
        ...page,
        summaryModel: await this.aiService.getCurrentModel(),
      },
    })
  }

  async updatePage(id: string, updateData: UpdatePageDto) {
    // 检查页面是否存在
    const existingPage = await this.getPageById(id)

    // 如果要更新 slug，先检查新的 slug 是否已被使用
    if (updateData.slug && updateData.slug !== existingPage.slug) {
      const slugExists = await this.db.pages.findUnique({
        where: {
          slug: updateData.slug,
          NOT: { id },
        },
      })

      if (slugExists) {
        throw new BadRequestException(`别名 ${updateData.slug} 已被使用`)
      }
    }

    // 更新页面
    return this.db.pages.update({
      where: { id },
      data: {
        ...updateData,
        summaryModel: await this.aiService.getCurrentModel(),
      },
    })
  }

  async deletePage(id: string) {
    // 检查页面是否存在
    await this.getPageById(id)

    // 删除页面
    return this.db.pages.delete({
      where: { id },
    })
  }

  async deleteMultiplePages(ids: string[]) {
    // 一次性删除多个页面
    return this.db.pages.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }

  async likePage(id: string) {
    const page = await this.getPageById(id)
    await this.db.pages.update({
      where: { id },
      data: { likes: page.likes + 1 },
    })
    return
  }

  async getPageCount() {
    return this.db.pages.count()
  }
}
