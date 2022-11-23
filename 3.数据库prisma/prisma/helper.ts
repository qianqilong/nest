import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/**
 *
 * @param count 模拟数据条数
 * @param callback 回调函数(操作数据库的实例)
 */
export async function create(
  count = 1,
  callback: (prisma: PrismaClient) => void,
) {
  for (let i = 0; i < count; i++) {
    callback(prisma);
  }
}
