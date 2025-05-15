import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { Auth } from '~/common/decorators/auth.decorator'

import { AnalyzeQueryDto } from './analyze.dto'
import { AnalyzeService } from './analyze.service'

@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Get()
  @Auth()
  @ApiOperation({
    summary: '获取分析数据',
    description: '获取分析数据',
  })
  async getAnalyze(@Query() query: AnalyzeQueryDto) {
    return this.analyzeService.getAnalyze(query?.date)
  }
}
