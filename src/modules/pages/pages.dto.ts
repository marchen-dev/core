import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class PageDto {
  @IsString()
  @ApiProperty({
    example: '关于我',
    description: '页面的标题',
  })
  readonly title: string

  @IsString()
  @ApiProperty({
    example: '关于我',
    description: '页面的内容',
  })
  readonly content: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '这是关于我页面的简介',
    description: '页面摘要',
    required: false,
  })
  readonly summary?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'gpt-3.5-turbo',
    description: '摘要生成的模型',
    required: false,
  })
  readonly summaryModel?: string

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 0,
    description: '页面的阅读量',
    required: false,
  })
  readonly read?: number = 0

  @IsString()
  @ApiProperty({
    example: 'about',
    description: '页面的别名',
  })
  readonly slug: string
}

export class UpdatePageDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '关于我',
    description: '页面的标题',
    required: false,
  })
  readonly title?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '关于我',
    description: '页面的内容',
    required: false,
  })
  readonly content?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '这是关于我页面的简介',
    description: '页面摘要',
    required: false,
  })
  readonly summary?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'gpt-3.5-turbo',
    description: '摘要生成的模型',
    required: false,
  })
  readonly summaryModel?: string

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 0,
    description: '页面的阅读量',
    required: false,
  })
  readonly read?: number

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'about',
    description: '页面的别名',
    required: false,
  })
  readonly slug?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'icon-[mingcute--bulb-line]',
    description: '页面的图标',
    required: false,
  })
  readonly icon?: string
}

export class DeleteMultiplePagesDto {
  @IsArray()
  @IsUUID('4', { each: true })
  @ApiProperty({
    example: ['uuid1', 'uuid2'],
    description: '要删除的页面ID数组',
    type: [String],
  })
  readonly ids: string[]
}
