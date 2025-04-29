import { Body, Controller, Get, Patch, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { appConfig } from '~/app.config'
import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'
import {
  MasterInfo,
  MasterInfoDto,
} from '~/common/decorators/current-user.decorator'

import { SiteService } from '../site/site.service'
import { LoginDto, RegisterDto, UpdateUserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiName
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly siteService: SiteService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册', description: '注册一个新的主用户' })
  async register(@Body() user: RegisterDto) {
    await this.userService.registerMaster(user)
    await this.siteService.initlizeSite()
    return
  }

  @Post('login')
  @ApiOperation({
    summary: '用户登录',
    description: '用户登录并返回 JWT token',
  })
  async login(@Body() user: LoginDto) {
    const token = await this.userService.login(user)
    return {
      token,
      expiresIn: appConfig.jwt.expiresIn,
    }
  }

  @Get()
  @ApiOperation({ summary: '获取用户信息', description: '返回当前用户信息' })
  userInfo() {
    return this.userService.getMasterInfo()
  }

  @Get('master')
  @Auth()
  @ApiOperation({
    summary: '获取主用户信息',
    description: '返回经过认证的主用户信息',
  })
  masterInfo(@MasterInfo() master: MasterInfoDto) {
    return master
  }

  @Patch('master')
  @Auth()
  @ApiOperation({
    summary: '更新主用户信息',
    description: '更新主用户信息',
  })
  updateMasterInfo(
    @Body() user: UpdateUserDto,
    @MasterInfo() master: MasterInfoDto,
  ) {
    return this.userService.updateMasterInfo(user, master)
  }
}
