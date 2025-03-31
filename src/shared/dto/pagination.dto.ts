import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'take 是必填项' })
  @Min(1, { message: '每页记录数必须大于等于 1' })
  @ApiProperty({
    example: 10,
    description: '每页的记录数，默认为 10 条',
  })
  take: number

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '3ba1433f-ed57-425f-83c8-797a097945cd',
    description: 'posts 字段的 id',
    required: false,
  })
  cursor?: string
}
