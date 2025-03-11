import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class FriendsDto {
  @IsString()
  @IsNotEmpty({ message: '名称是必填项' })
  @ApiProperty({
    example: '苏小莫',
    description: '友链的名称',
  })
  readonly name: string

  @IsString()
  @IsUrl({}, { message: 'URL 格式无效' })
  @IsNotEmpty({ message: 'URL 是必填项' })
  @ApiProperty({
    example: 'https://suemor.com',
    description: '友链的唯一 URL',
  })
  readonly url: string

  @IsString()
  @IsNotEmpty({ message: '头像地址是必填项' })
  @ApiProperty({
    example: 'https://suemor.com/avatar.jpg',
    description: '友链的头像地址',
  })
  readonly avatar: string

  @IsString()
  @IsNotEmpty({ message: '介绍是必填项' })
  @ApiProperty({
    example: '这是一个友链的简短介绍',
    description: '友链的介绍',
  })
  readonly introduce: string
}
