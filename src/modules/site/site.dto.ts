import { IsOptional, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class SiteDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'SuemorのBlog',
    description: '站点的标题',
  })
  readonly title?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '所谓自由就是可以说二加二等于四的自由',
    description: '站点的描述',
  })
  readonly description?: string

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    example: ['Blog'],
    description: '站点的关键词',
    isArray: true,
  })
  readonly keywords?: string[]

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://github.com/suemor233.png',
    description: '站点的favicon',
  })
  readonly favicon?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://suemor.com',
    description: '站点的url',
  })
  readonly url?: string
}
