import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: '名称是必填项' })
  @ApiProperty({
    example: 'suemor',
    description: '用户的唯一名称',
  })
  readonly name: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Sue',
    description: '用户的昵称',
  })
  readonly nickname?: string

  @IsString()
  @IsNotEmpty({ message: '密码是必填项' })
  @ApiProperty({
    example: '123456',
    description: '用户的密码',
  })
  readonly password: string

  @IsEmail({}, { message: '邮箱格式无效' })
  @IsNotEmpty({ message: '邮箱是必填项' })
  @ApiProperty({
    example: 'suemor@example.com',
    description: '用户的唯一邮箱',
  })
  readonly email: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '关于我的简短介绍',
    description: '用户的可选介绍',
    required: false,
  })
  readonly introduce?: string
}

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: '名称是必填项' })
  @ApiProperty({
    example: 'suemor',
    description: '用户的唯一名称',
  })
  readonly name: string

  @IsString()
  @IsNotEmpty({ message: '密码是必填项' })
  @ApiProperty({
    example: '123456',
    description: '用户的密码',
  })
  readonly password: string
}
