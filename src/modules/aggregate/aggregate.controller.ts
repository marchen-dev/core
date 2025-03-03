import { Controller, Get } from '@nestjs/common'

import { ApiName } from '~/common/decorators/api-name.decorator'

import { AggregateService } from './aggregate.service'

@Controller('aggregate')
@ApiName
export class AggregateController {
  constructor(private readonly aggregateService: AggregateService) {}

  @Get()
  async aggregate() {
    return this.aggregateService.aggregate()
  }
}
