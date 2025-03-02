import { ExtractJwt, Strategy } from 'passport-jwt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { appConfig } from '~/app.config'
import { JwtPayloadDto } from '~/modules/auth/auth.dto'
import { AuthService } from '~/modules/auth/auth.service'

@Injectable()
export class JwtService extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.secret,
    })
  }

  async validate(payload: JwtPayloadDto) {
    const dbUser = await this.authService.verifyPayload(payload)
    if (!dbUser) {
      throw new UnauthorizedException('token无效')
    }
    return {
      user: dbUser,
    }
  }
}
