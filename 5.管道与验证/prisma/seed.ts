import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

async function run() {
  await prisma.article.create({
    data: {
      title: Random.ctitle(),
      content: Random.cparagraph(10, 50),
    },
  });
  await prisma.user.create({
    data: {
      username: 'admin',
      password: '123456',
    },
  });
}
run();
