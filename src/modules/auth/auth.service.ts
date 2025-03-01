import { compare } from 'bcryptjs'

import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { DataBaseService } from '~/connections/database/database.service'

import { LoginDto } from '../user/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DataBaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: LoginDto) {
    const foundUser = await this.db.users.findUnique({
      where: {
        name: user.name,
      },
    })
    if (!foundUser) throw new BadRequestException('用户不存在')

    const isPasswordValid = await compare(user.password, foundUser.password)
    if (!isPasswordValid) throw new BadRequestException('密码错误')
    return foundUser.id
  }

  async sign(id: number) {
    return this.jwtService.sign({ id })
  }
}
