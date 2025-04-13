import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import { PaginationDto } from '~/shared/dto/pagination.dto'

export class PostDto {
  @IsString()
  @IsNotEmpty({ message: '文章标题是必填项' })
  @ApiProperty({
    example: '使用 NestJS 开发博客系统',
    description: '文章的标题',
  })
  title: string

  @IsString()
  @IsNotEmpty({ message: '文章内容是必填项' })
  @ApiProperty({
    example: '这是文章的详细内容。',
    description: '文章的内容',
  })
  content: string

  @IsString()
  @IsUrl({}, { message: '封面 URL 格式无效' })
  @IsNotEmpty({ message: '封面 URL 是必填项' })
  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: '文章封面的图片地址',
  })
  cover: string

  @IsString()
  @IsNotEmpty({ message: 'slug 是必填项' })
  @ApiProperty({
    example: 'nestjs-blog-post',
    description: '文章的唯一标识符 slug',
  })
  slug: string

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    example: ['NestJS', 'TypeScript', '后端开发'],
    description: '文章的标签数组',
    type: [String], // Swagger 文档中声明数组的类型
  })
  tags?: string[]

  @IsString()
  @IsNotEmpty({ message: '分类 ID 是必填项' })
  @ApiProperty({
    example: '1234abcd',
    description: '文章所属分类的唯一标识符',
  })
  categoryId: string
}

export class PostPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  @ApiProperty({
    enum: ['asc', 'desc'],
    example: 'desc',
    description: '排序方向，默认为降序',
    required: false,
  })
  orderBy?: 'asc' | 'desc' = 'desc'

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'default',
    description: '根据指定分类排序，默认为 default',
    required: false,
  })
  category?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '搜索关键词',
    description: '搜索关键词，默认为空',
    required: false,
  })
  search?: string
}
