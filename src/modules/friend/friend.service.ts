import { BadRequestException, Injectable } from '@nestjs/common'
import { FriendStatus } from '@prisma/client'

import { DataBaseService } from '~/connections/database/database.service'

import { AuthService } from '../auth/auth.service'
import { FriendCreateDto, FriendsDto } from './friend.dto'

@Injectable()
export class FriendService {
  constructor(
    private readonly db: DataBaseService,
    private readonly authService: AuthService,
  ) {}
  friendsInfo() {
    return this.db.friends.findMany({
      where: {
        status: 'ACCEPTED',
      },
    })
  }

  async addFriend(friends: FriendCreateDto) {
    await this.authService.verifyCaptcha(friends.captchaToken)
    const dbFriend = await this.db.friends.findUnique({
      where: {
        url: friends.url,
      },
    })
    if (dbFriend) {
      throw new BadRequestException('你已经提交过友链了')
    }
    const { name, url, avatar, introduce, email } = friends
    return this.db.friends.create({
      data: {
        name,
        url,
        avatar,
        introduce,
        email,
        status: 'PENDING',
      },
    })
  }

  async deleteFriend(id: string) {
    const dbFriend = await this.db.friends.findUnique({
      where: {
        id,
      },
    })
    if (!dbFriend) {
      throw new BadRequestException('朋友不存在')
    }
    return this.db.friends.delete({
      where: {
        id,
      },
    })
  }

  getFriendsByStatus(status?: FriendStatus) {
    if (status) {
      return this.db.friends.findMany({
        where: {
          status,
        },
      })
    }
    return this.db.friends.findMany()
  }

  async updateFriendStatus(id: string, status: FriendStatus) {
    const dbFriend = await this.db.friends.findUnique({
      where: {
        id,
      },
    })
    if (!dbFriend) {
      throw new BadRequestException('朋友不存在')
    }
    return this.db.friends.update({
      where: { id },
      data: { status },
    })
  }

  async updateFriend(id: string, friends: FriendsDto) {
    const dbFriend = await this.db.friends.findUnique({
      where: { id },
    })
    if (!dbFriend) {
      throw new BadRequestException('朋友不存在')
    }
    const { name, url, avatar, introduce, email } = friends
    return this.db.friends.update({
      where: { id },
      data: { name, url, avatar, introduce, email },
    })
  }
  async addFriendByMaster(friends: FriendsDto) {
    const dbFriend = await this.db.friends.findUnique({
      where: { url: friends.url },
    })
    if (dbFriend) {
      throw new BadRequestException('你已经提交过友链了')
    }
    const { name, url, avatar, introduce, email } = friends
    return this.db.friends.create({
      data: {
        name,
        url,
        avatar,
        introduce,
        email,
        status: 'ACCEPTED',
      },
    })
  }
}
