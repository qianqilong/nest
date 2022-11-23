import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(private jwt: JwtService) {}
  //   生成token的服务
  async setToken({ username, id }: user) {
    return {
      token: await this.jwt.signAsync({
        name: username,
        sub: id,
      }),
    };
  }
}
