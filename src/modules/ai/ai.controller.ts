import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'

import { AiService } from './ai.service'

@Controller('ai')
@ApiName
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('summary')
  @ApiOperation({
    summary: 'AI 摘要',
    description: '通过 AI 生成文章摘要',
  })
  async aiSummary(@Body() body: { content: string }) {
    return this.aiService.generateAiSummary(body.content)
  }
}
