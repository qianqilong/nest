import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import UserinfoDTO from './user.dto';

@Controller('user')
export class UserController {
  @Post('register')
  async register(@Body() dto: UserinfoDTO) {
    const prisma = new PrismaClient();
    const uesr = await prisma.user.create({
      data: {
        username: dto.username,
        password: dto.password,
      },
    });
    return uesr;
  }
}
