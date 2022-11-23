import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { TokenService } from '../token/token.service';
import { RedisInstance } from './utils/redis';

@Injectable()
export class RedisService {
  constructor(private readonly token: TokenService) {}
  async setRedis(user: user) {
    // 拿到token
    const { token } = await this.token.setToken(user);
    // 实例化 redis
    const redis = await RedisInstance.initRedis();
    // 将用户信息和 token 存入 redis，并设置失效时间，语法：[key, seconds, value]
    await redis.setex(`${user.id}-${user.username}`, 300, `${token}`);
  }
}
