import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  name: 'qql',
  isDev: process.env.NODE_ENV === 'development',
}))
