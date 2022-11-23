import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from '../../utils/jwt.strategy';
import { TokenModule } from '../token/token.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TokenModule, RedisModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
