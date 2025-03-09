import { BadRequestException, Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'

import { FriendsDto } from './friend.dto'

@Injectable()
export class FriendService {
  constructor(private readonly db: DataBaseService) {}
  friendsInfo() {
    return this.db.friends.findMany()
  }

  async addFriend(friends: FriendsDto) {
    const dbFriend = await this.db.friends.findUnique({
      where: {
        url: friends.url,
      },
    })
    if (dbFriend) {
      throw new BadRequestException('朋友已存在')
    }
    return this.db.friends.create({
      data: {
        ...friends,
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
}
