import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { AiProvider } from '@prisma/client'

export class SummaryDto {
  @IsString()
  @ApiProperty({
    example: '1234abcd',
    description: '文章摘要',
  })
  text: string

  @IsString()
  @ApiProperty({
    example: 'gpt-4o-mini',
    description: '模型',
  })
  @IsOptional()
  model?: string
}

export class AITextgenerationDto {
  @IsString()
  @ApiProperty({
    example: '你好',
    description: '输入内容',
  })
  prompt: string

  @IsString()
  @ApiProperty({
    example: 'category',
    description: '类型',
  })
  @IsOptional()
  type?: 'category' | 'tags' | 'post' | 'slug' | 'title'
}

export class AIDto {
  @IsString()
  @ApiProperty({
    example: 'gpt-4.1-nano',
    description: '模型',
  })
  model: string

  @IsEnum(AiProvider)
  @IsOptional()
  @ApiProperty({
    example: 'OPENAI',
    description: 'AI 提供商',
    enum: AiProvider,
    enumName: 'AiProvider',
    required: false,
  })
  provider: AiProvider

  @IsString()
  @ApiProperty({
    example: 'https://api.openai.com/v1',
    description: 'API 地址',
  })
  apiUrl: string

  @IsString()
  @ApiProperty({
    example: 'sk-proj-1234567890',
    description: 'API 密钥',
  })
  apiKey: string

  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: '是否启用',
  })
  active: boolean
}
