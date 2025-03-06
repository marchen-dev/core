import type { ExecutionContext } from '@nestjs/common'
import type { AttachedRequest } from '~/transformers/get-req.transformer'

import { createParamDecorator } from '@nestjs/common'

import { getNestExecutionContextRequest } from '~/transformers/get-req.transformer'

export const MasterInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getNestExecutionContextRequest(ctx)
    return request.user
  },
)

export type MasterInfoDto = AttachedRequest['user']
