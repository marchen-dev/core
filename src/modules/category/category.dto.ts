import { IsNotEmpty, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'name 是必填项' })
  @ApiProperty({
    example: '技术',
    description: '分类的名称',
  })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'slug 是必填项' })
  @ApiProperty({
    example: 'tech',
    description: '分类的唯一标识符 slug',
  })
  slug: string
}
