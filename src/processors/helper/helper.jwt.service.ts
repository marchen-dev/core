// src/logical/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt'

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { appConfig } from '~/app.config'

@Injectable()
export class JwtService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.app['jwt-secret'],
    })
  }

  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`)
    return {
      userId: payload.sub,
      username: payload.username,
      realName: payload.realName,
      role: payload.role,
    }
  }
}
