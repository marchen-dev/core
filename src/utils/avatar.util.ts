import * as crypto from 'node:crypto'

export const fetchAvatarFromEmail = async (email: string) => {
  const hash = generateMD5(email.trim().toLowerCase())
  return `https://cravatar.cn/avatar/${hash}`
}

function generateMD5(text: string) {
  return crypto.createHash('md5').update(text).digest('hex')
}
