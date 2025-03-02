import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard as _AuthGuard } from '@nestjs/passport'

import { getNestExecutionContextRequest } from '~/transformers/get-req.transformer'

@Injectable()
export class AuthGuard extends _AuthGuard('jwt') implements CanActivate {
  override async canActivate(context: ExecutionContext): Promise<any> {
    const request = getNestExecutionContextRequest(context)
    if (typeof request.user !== 'undefined') {
      return true
    }
    return super.canActivate(context)
  }
}
