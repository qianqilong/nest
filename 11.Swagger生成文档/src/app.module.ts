import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { PrismaModule } from './module/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './module/token/token.module';
import { RedisModule } from './module/redis/redis.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokenModule,
    RedisModule,
  ],
})
export class AppModule {}
