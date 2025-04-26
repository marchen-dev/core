import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import { IsOptionalWithEmptyString } from '~/common/decorators/is-optional-with-empty-string'
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
  @IsOptionalWithEmptyString()
  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: '文章封面的图片地址',
  })
  cover?: string

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

  @IsString()
  @IsOptionalWithEmptyString()
  @ApiProperty({
    example: '1234abcd',
    description: '文章摘要',
  })
  summary?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'gpt-4o-mini',
    description: '文章摘要模型',
  })
  summaryModel?: string
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

export class DeleteMultiplePostsDto {
  @ApiProperty({
    description: '需要删除的文章 ID 数组。',
    type: [String], // 如果你的 ID 是数字类型，则为 [Number]
    example: ['clqkf9zsr0000m8zjh7q3g3f9', 'clqkfa1b20002m8zjq9r8h4k5'], // 示例 ID
  })
  @IsArray({ message: 'ids 必须是一个数组' }) // 添加中文错误提示（可选）
  @ArrayNotEmpty({ message: 'ids 数组不能为空' })
  @IsString({ each: true, message: '数组中的每个 ID 必须是字符串' }) // 如果 ID 是数字，则使用 @IsNumber({ each: true })
  ids: string[] // 如果 ID 是数字，则为 number[]
}
