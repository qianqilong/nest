import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from '../../utils/jwt.strategy';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
