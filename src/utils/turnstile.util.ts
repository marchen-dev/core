import axios from 'axios'

import { enableTurnstile, TURNSTILE_SECRET_KEY } from '~/global/env.global'

export async function verifyTurnstileToken(token?: string): Promise<boolean> {
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
}
