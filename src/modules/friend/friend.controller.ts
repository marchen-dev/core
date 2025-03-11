import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'

import { FriendsDto } from './friend.dto'
import { FriendService } from './friend.service'

@Controller('friend')
@ApiName
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  @ApiOperation({
    summary: '获取朋友列表',
    description: '返回所有友链的信息列表',
  })
  friendsInfo() {
    return this.friendService.friendsInfo()
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: '添加朋友', description: '创建新的友链' })
  async addFriend(@Body() friends: FriendsDto) {
    await this.friendService.addFriend(friends)
    return
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: '删除朋友', description: '删除友链' })
  async deleteFriend(@Param('id') id: string) {
    await this.friendService.deleteFriend(id)
    return
  }
}
