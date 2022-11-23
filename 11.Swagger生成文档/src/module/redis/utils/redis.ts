import Redis from 'ioredis';

const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于存储 redis 实例

export class RedisInstance {
  static async initRedis(db = 0) {
    const config = process.env.redis as unknown as object;
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      redisList[db] = new Redis({ ...config, db });
      redisIndex.push(db);
    }

    return redisList[db];
  }
}
