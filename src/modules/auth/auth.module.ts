import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { appConfig } from '~/app.config'
import { JwtService } from '~/processors/helper/helper.jwt.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

const jwtModule = JwtModule.registerAsync({
  useFactory() {
    return {
      secret: appConfig.jwt.secret,
      signOptions: {
        expiresIn: `${appConfig.jwt.expiresIn}d`,
        algorithm: 'HS256',
      },
    }
  },
})
@Module({
  imports: [PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService, jwtModule],
})
export class AuthModule {}
