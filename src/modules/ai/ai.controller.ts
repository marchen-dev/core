import { ServerResponse } from 'node:http'

import { Body, Controller, Get, Post, Res } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorators/api-name.decorator'

import { AIDto, AITextgenerationDto } from './ai.dto'
import { AiService } from './ai.service'

@Controller('ai')
@ApiName
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/generate')
  @ApiOperation({
    summary: 'AI 内容生成',
    description: '通过 AI 生成内容',
  })
  async AItextgeneration(@Body() ai: AITextgenerationDto) {
    return this.aiService.generateAiText(ai.prompt, ai.type)
  }

  @Post('/generate/stream')
  @ApiOperation({
    summary: 'AI 文本流式生成',
    description: '通过 SSE 流式生成 AI 文本',
  })
  async streamAiText(
    @Body() ai: AITextgenerationDto,
    @Res() res: ServerResponse,
  ) {
    return this.aiService.streamAiText(ai.prompt, res)
  }

  @Post()
  @ApiOperation({
    summary: '创建 AI',
    description: '创建 AI',
  })
  async createAI(@Body() ai: AIDto) {
    return this.aiService.createAI(ai)
  }

  @Get('all')
  @ApiOperation({
    summary: '获取全部 AI',
    description: '获取全部 AI',
  })
  async getAllAI() {
    return this.aiService.getAllAI()
  }
}
