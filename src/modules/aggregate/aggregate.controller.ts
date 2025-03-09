import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'

import { AggregateService } from './aggregate.service'

@Controller('aggregate')
@ApiName
export class AggregateController {
  constructor(private readonly aggregateService: AggregateService) {}

  @Get()
  @ApiOperation({ summary: '聚合数据', description: '返回聚合后的数据结果' })
  async aggregate() {
    return this.aggregateService.aggregate()
  }
}
