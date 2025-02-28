import { ApiTags } from '@nestjs/swagger'

import { isDev } from '~/global/env.global'

export const ApiName = (target) => {
  if (!isDev) {
    return
  }
  const name = target.name.replace('Controller', '')
  ApiTags(`${name} Routes`).call(null, target)
}
