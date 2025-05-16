import axios from 'axios'

import { BadRequestException } from '@nestjs/common'

import { enableTurnstile, TURNSTILE_SECRET_KEY } from '~/global/env.global'

export async function verifyTurnstileToken(token?: string): Promise<boolean> {
  try {
    // 如果没有开启 Turnstile，直接返回 true
    if (!enableTurnstile) {
      return true
    }
    if (!token) {
      return false
    }
    const { data } = await axios.post<{ success: boolean }>(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      },
    )
    return data.success
  } catch {
    throw new BadRequestException('cloudflare turnstile 验证未通过')
  }
}
