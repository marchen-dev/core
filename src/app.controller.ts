import { Controller, Get } from '@nestjs/common'

import { AppService } from './app.service'
import { ApiName } from './common/decorators/api-name.decorator'

@Controller()
@ApiName
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  getHello() {
    return 'pong'
  }
}
