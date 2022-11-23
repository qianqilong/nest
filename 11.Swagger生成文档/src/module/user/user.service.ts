import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import registerDTO from './dto/register.dto';
import loginDTO from './dto/login.dto';
import { TokenService } from '../token/token.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private token: TokenService,
    private redis: RedisService,
  ) {}
  // 注册的服务
  async register(dto: registerDTO) {
    const password = await hash(dto.password); // 加密
    const user = this.prisma.user.create({
      data: {
        username: dto.username,
        password,
      },
    });
    return user;
  }

  // 登录的服务
  async login(dto: loginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });
    // 校检密码
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException(['password:密码输入错误']);
    }
    // 调用设置redis的服务
    this.redis.setRedis(user);
    return this.token.setToken(user);
  }

  // 测试token认证
  async test() {
    return this.prisma.user.findMany(); // 获取所有用户
  }
}
