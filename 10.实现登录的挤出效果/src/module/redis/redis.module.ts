import { Module } from '@nestjs/common';
import { TokenModule } from '../token/token.module';
import { RedisService } from './redis.service';

@Module({
  imports: [TokenModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
