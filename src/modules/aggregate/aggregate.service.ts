import { Injectable } from '@nestjs/common'

import { CategoryService } from '../category/category.service'
import { FriendService } from '../friend/friend.service'
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
  ) {}
  async aggregate() {
    const user = await this.userService.getMasterInfo()
    const aggregateData = await Promise.allSettled([
      this.categoryService.categoriesInfo(),
      this.postService.getPostsByPagination({ take: 6 }),
      this.friendService.friendsInfo(),
      this.siteService.siteInfo(),
    ])
    const [category, post, friend, site] = aggregateData.map((data) => {
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
    }
  }
}
