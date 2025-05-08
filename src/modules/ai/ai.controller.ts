import { ServerResponse } from 'node:http'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'
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

  @Put(':id')
  @ApiOperation({
    summary: '更新 AI',
    description: '更新 AI',
  })
  async updateAI(@Body() ai: AIDto, @Param('id') id: string) {
    return this.aiService.updateAI(id, ai)
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除 AI',
    description: '删除 AI',
  })
  async deleteAI(@Param('id') id: string) {
    return this.aiService.deleteAI(id)
  }
}
