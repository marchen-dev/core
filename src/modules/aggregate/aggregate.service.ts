import { Injectable } from '@nestjs/common'

import { AiService } from '../ai/ai.service'
import { AnalyzeService } from '../analyze/analyze.service'
import { CategoryService } from '../category/category.service'
import { FriendService } from '../friend/friend.service'
import { PagesService } from '../pages/pages.service'
import { PostService } from '../post/post.service'
import { SiteService } from '../site/site.service'
import { UserService } from '../user/user.service'

@Injectable()
export class AggregateService {
  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly postService: PostService,
    private readonly friendService: FriendService,
    private readonly siteService: SiteService,
    private readonly pageService: PagesService,
    private readonly aiService: AiService,
    private readonly analyzeService: AnalyzeService,
  ) {}
  async aggregate() {
    const user = await this.userService.getMasterInfo()
    const aggregateData = await Promise.allSettled([
      this.categoryService.categoriesInfo(),
      this.postService.getPostsByPagination({ take: 6 }),
      this.friendService.friendsInfo(),
      this.siteService.siteInfo(),
      this.pageService.getPages(),
    ])
    const [category, post, friend, site, page] = aggregateData.map((data) => {
      if (data.status === 'rejected') {
        return null
      }
      return data.value
    })

    return {
      user,
      category,
      post,
      friend,
      site,
      page,
    }
  }

  async aggregateDashboard() {
    const aggregateData = await Promise.allSettled([
      this.categoryService.getCategoryCount(),
      this.postService.getPostCount(),
      this.friendService.getFriendCount(),
      this.pageService.getPageCount(),
      this.aiService.getAiCount(),
      this.postService.getPostCharacter(),
      this.postService.getPostReadCount(),
      this.postService.getPostLikeCount(),
      this.analyzeService.getLastWeekAnalyze(),
    ])
    const [category, post, friend, page, ai, character, read, like, analyze] =
      aggregateData.map((data) => {
        if (data.status === 'rejected') {
          return null
        }
        return data.value
      })
    return {
      count: { category, post, page, friend, ai, character, read, like },
      analyze,
    }
  }
}
