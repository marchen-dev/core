import { Controller, Get } from '@nestjs/common'

import { ApiName } from '~/common/decorators/api-name.decorator'

import { UserService } from './user.service'

@Controller('user')
@ApiName
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  create() {
    return '1'
  }
}
