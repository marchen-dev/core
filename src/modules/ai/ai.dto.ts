import { IsOptional, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

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
