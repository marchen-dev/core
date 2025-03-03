import { Body, Controller, Get, Post } from '@nestjs/common'

import { ApiName } from '~/common/decorators/api-name.decorator'

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
  login(@Body() user: LoginDto) {
    return this.userService.login(user)
  }

  @Get()
  masterInfo() {
    return this.userService.getMasterInfo()
  }
}
