import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import packageJson from '../package.json'
import { AppService } from './app.service'
import { ApiName } from './common/decorators/api-name.decorator'

@Controller()
@ApiName
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @ApiOperation({
    summary: '测试接口',
    description: '测试接口是否正常',
  })
  getHello() {
    return 'pong'
  }

  @Get()
  @ApiOperation({
    summary: '测试接口',
    description: '测试接口是否正常',
  })
  getTest() {
    return {
      name: packageJson.name,
      version: packageJson.version,
      author: packageJson.author,
      license: packageJson.license,
    }
  }
}
