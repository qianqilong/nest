import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import { create } from '../helper';

export function article() {
  create(100, async (prisma: PrismaClient) => {
    await prisma.article.create({
      data: {
        title: Random.ctitle(),
        content: Random.cparagraph(10, 50), //段落
        thumb: Random.image('文'),
        categoryId: Math.ceil(Math.random() * 10),
      },
    });
  });
}
