import { NotFoundException } from '@nestjs/common'

export class NotInitializedException extends NotFoundException {
  constructor() {
    super('主人未注册，请先初始化博客')
  }
}
