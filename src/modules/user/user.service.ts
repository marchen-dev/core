import { hash } from 'bcryptjs'

import { BadRequestException, Injectable } from '@nestjs/common'

import { DataBaseService } from '~/connections/database/database.service'

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
    if (hasMaster) throw new BadRequestException('只允许注册一个主人')
    const hashPassword = await hash(user.password, 9)
    await this.db.users.create({
      data: {
        ...user,
        password: hashPassword,
      },
    })
    return
  }

  async login(user: LoginDto) {
    const userId = await this.authService.validateUser(user)
    // FIXME
    return this.authService.sign(userId)
  }

  async hasMaster() {
    return !!(await this.db.users.count())
  }
}
