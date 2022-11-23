import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import { create } from '../helper';

export function user() {
  create(30, async (prisma: PrismaClient) => {
    await prisma.user.create({
      data: {
        email: Random.email(),
        password: '123456',
        github: Random.email(),
        avatar: Random.image('钱'),
      },
    });
  });
}
