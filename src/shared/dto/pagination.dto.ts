import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, Min } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'page 是必填项' })
  @Min(1, { message: '页码必须从 1 开始' })
  @ApiProperty({
    example: 1,
    description: '当前页码，从 1 开始',
  })
  page: number

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'pageSize 是必填项' })
  @Min(1, { message: '每页记录数必须大于等于 1' })
  @ApiProperty({
    example: 10,
    description: '每页的记录数，默认为 10 条',
  })
  pageSize: number
}
