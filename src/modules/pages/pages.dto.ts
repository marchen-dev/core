import { IsNumber, IsString } from 'class-validator'

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

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '页面的排序',
  })
  readonly order: number

  @IsString()
  @ApiProperty({
    example: 'about',
    description: '页面的别名',
  })
  readonly slug: string
}
