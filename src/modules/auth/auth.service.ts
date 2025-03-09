import { compare } from 'bcryptjs'

import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { DataBaseService } from '~/connections/database/database.service'
import { verifyTurnstileToken } from '~/utils/turnstile.util'

import { LoginDto } from '../user/user.dto'
import { JwtPayloadDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DataBaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: LoginDto) {
    const isSuccess = await verifyTurnstileToken(user.captchaToken)
    if (!isSuccess && !isDev)
      throw new BadRequestException('cloudflare turnstile 验证未通过')
    const dbUser = await this.db.users.findUnique({
      where: {
        name: user.name,
      },
    })
    if (!dbUser) throw new BadRequestException('用户不存在')

    const isPasswordValid = await compare(user.password, dbUser.password)
    if (!isPasswordValid) throw new BadRequestException('密码错误')
    return dbUser.authCode
  }

  async sign(authCode: string) {
    return this.jwtService.sign({ authCode })
  }
  async verifyPayload(payload: JwtPayloadDto) {
    const dbUser = await this.db.users.findUnique({
      where: {
        authCode: payload.authCode,
      },
      omit: {
        password: true,
        authCode: true,
      },
    })
    return dbUser
  }
}
