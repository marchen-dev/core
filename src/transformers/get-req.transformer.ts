import type { ExecutionContext } from '@nestjs/common'
import type { users } from '@prisma/client'

export type AttachedRequest = {
  user: Omit<users, 'password' | 'authCode'>
}

export function getNestExecutionContextRequest(
  context: ExecutionContext,
): Request & AttachedRequest {
  return context.switchToHttp().getRequest()
}
