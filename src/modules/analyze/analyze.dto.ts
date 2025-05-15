import { IsInt, IsIP, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class AnalyzeDto {
  @IsString()
  @IsNotEmpty({ message: 'path 是必填项' })
  @ApiProperty({
    example: '/',
    description: '请求路径',
  })
  path: string

  @IsIP()
  @IsNotEmpty({ message: 'ip 是必填项' })
  @ApiProperty({
    example: '127.0.0.1',
    description: '请求IP地址',
  })
  ip: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: '用户代理',
    required: false,
  })
  userAgent?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com',
    description: '请求来源',
    required: false,
  })
  referer?: string

  @IsString()
  @IsNotEmpty({ message: 'method 是必填项' })
  @ApiProperty({
    example: 'GET',
    description: 'HTTP请求方法',
  })
  method: string

  @IsInt()
  @IsNotEmpty({ message: 'statusCode 是必填项' })
  @ApiProperty({
    example: 200,
    description: 'HTTP状态码',
  })
  statusCode: number

  @IsInt()
  @IsNotEmpty({ message: 'duration 是必填项' })
  @ApiProperty({
    example: 42,
    description: '请求处理时间(毫秒)',
  })
  duration: number
}

export class AnalyzeQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2024-01-01',
    description: '查询日期',
    required: false,
  })
  date?: string
}
