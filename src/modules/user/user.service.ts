import { hash } from 'bcryptjs'
import { nanoid } from 'nanoid'

import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { MasterInfoDto } from '~/common/decorators/current-user.decorator'
import { NotInitializedException } from '~/common/exceptions/not-initialized.exception'
import { DataBaseService } from '~/connections/database/database.service'
import { fetchAvatarFromEmail } from '~/utils/avatar.util'

import { AiService } from '../ai/ai.service'
import { AuthService } from '../auth/auth.service'
import { SiteService } from '../site/site.service'
import { LoginDto, RegisterDto, UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly db: DataBaseService,
    private readonly authService: AuthService,
    private readonly siteService: SiteService,
    private readonly aiService: AiService,
  ) {}
  async registerMaster(user: RegisterDto, tx: Prisma.TransactionClient) {
    const hasMaster = await this.hasMaster()
    const { email, name, password, introduce, nickname } = user
    if (hasMaster) throw new BadRequestException('只允许注册一个主人')

    const avatar = await fetchAvatarFromEmail(email)
    const hashPassword = await hash(password, 7)
    const authCode = nanoid(10)
    await tx.users.create({
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

  async getMaster() {
    const hasMaster = await this.hasMaster()
    if (!hasMaster) {
      throw new NotInitializedException()
    }
    return this.db.users.findFirst()
  }

  updateMasterInfo(user: UpdateUserDto, master: MasterInfoDto) {
    const { name, introduce, nickname, social, email, avatar } = user
    return this.db.users.update({
      where: { id: master.id },
      data: { name, introduce, nickname, social, email, avatar },
    })
  }

  async initlizeSite(user: RegisterDto) {
    await this.db.$transaction(async (tx) => {
      await this.registerMaster(user, tx)
      await this.siteService.initlizeSite(user.url, tx)
      await this.aiService.initializeAI(tx)
    })
    return
  }
}
