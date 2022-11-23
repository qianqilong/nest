import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisInstance } from 'src/module/redis/utils/redis';

// 管理员守卫
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // 反射中包含了SetMetadata('roles', roles)放入的全局中，其他守卫可以使用
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // 获取请求头里的 token
    const authorization = request['headers'].authorization || void 0;
    const token = authorization.split(' ')[1];

    // 获取 redis 里缓存的 token
    const redis = await RedisInstance.initRedis();
    const key = `${user.id}-${user.username}`;
    const cacheToken = await redis.get(key); // 缓存的token

    if (token !== cacheToken) {
      // 如果 token 不匹配，禁止访问
      throw new UnauthorizedException();
    }

    // 第一个用户是管理员
    return user?.id == 1;
  }
}
