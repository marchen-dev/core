import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { FriendStatus } from '@prisma/client'

import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'

import { FriendCreateDto, FriendsDto, FriendStatusDto } from './friend.dto'
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

  @Auth()
  @Get('/all')
  @ApiOperation({
    summary: '获取指定状态的朋友列表',
    description: '返回所有指定状态的友链的信息列表',
  })
  pendingFriends(@Query() query?: FriendStatusDto) {
    return this.friendService.getFriendsByStatus(query?.status)
  }

  @Post()
  @ApiOperation({ summary: '添加朋友', description: '创建新的友链' })
  async addFriend(@Body() friends: FriendCreateDto) {
    await this.friendService.addFriend(friends)
    return
  }

  @Post('/master')
  @Auth()
  @ApiOperation({ summary: '添加朋友', description: '创建新的友链' })
  async addFriendByMaster(@Body() friends: FriendsDto) {
    await this.friendService.addFriendByMaster(friends)
    return
  }

  @Put(':id')
  @Auth()
  @ApiOperation({ summary: '更新朋友', description: '更新友链' })
  async updateFriend(@Param('id') id: string, @Body() friends: FriendsDto) {
    await this.friendService.updateFriend(id, friends)
    return
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: '删除朋友', description: '删除友链' })
  async deleteFriend(@Param('id') id: string) {
    await this.friendService.deleteFriend(id)
    return
  }

  @Post('/status/:id')
  @Auth()
  @ApiOperation({ summary: '更新朋友状态', description: '更新友链状态' })
  async updateFriendStatus(
    @Param('id') id: string,
    @Body() body: { status: FriendStatus },
  ) {
    await this.friendService.updateFriendStatus(id, body.status)
    return
  }
}
