import { hash } from 'bcryptjs'
import { nanoid } from 'nanoid'

import { BadRequestException, Injectable } from '@nestjs/common'

import { NotInitializedException } from '~/common/exceptions/not-initialized.exception'
import { DataBaseService } from '~/connections/database/database.service'
import { fetchAvatarFromEmail } from '~/utils/avatar.util'

import { AuthService } from '../auth/auth.service'
import { LoginDto, UserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly db: DataBaseService,
    private readonly authService: AuthService,
  ) {}
  async registerMaster(user: UserDto) {
    const hasMaster = await this.hasMaster()
    const { email, name, password, introduce, nickname } = user
    if (hasMaster) throw new BadRequestException('只允许注册一个主人')

    const avatar = await fetchAvatarFromEmail(email)
    const hashPassword = await hash(password, 7)
    const authCode = nanoid(10)
    await this.db.users.create({
      data: {
        email,
        name,
        nickname: nickname ?? name,
        introduce,
        password: hashPassword,
        authCode,
        avatar,
      },
    })
    return
  }

  async login(user: LoginDto) {
    const authCode = await this.authService.validateUser(user)
    return this.authService.sign(authCode)
  }

  async getMasterInfo() {
    const hasMaster = await this.hasMaster()
    if (!hasMaster) {
      throw new NotInitializedException()
    }
    return this.db.users.findFirst({
      omit: {
        password: true,
        authCode: true,
      },
    })
  }

  async hasMaster() {
    return !!(await this.db.users.count())
  }
}
