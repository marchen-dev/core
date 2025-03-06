import { Body, Controller, Get, Post } from '@nestjs/common'

import { appConfig } from '~/app.config'
import { ApiName } from '~/common/decorators/api-name.decorator'
import { Auth } from '~/common/decorators/auth.decorator'
import {
  MasterInfo,
  MasterInfoDto,
} from '~/common/decorators/current-user.decorator'

import { LoginDto, UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiName
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: UserDto) {
    return this.userService.registerMaster(user)
  }

  @Post('login')
  async login(@Body() user: LoginDto) {
    const token = await this.userService.login(user)
    return {
      token,
      expiresIn: appConfig.jwt.expiresIn,
    }
  }

  @Get()
  userInfo() {
    return this.userService.getMasterInfo()
  }

  @Get('master')
  @Auth()
  masterInfo(@MasterInfo() master: MasterInfoDto) {
    return master
  }
}
