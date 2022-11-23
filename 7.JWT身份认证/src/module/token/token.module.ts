import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'), // 读取jwt秘钥
          signOptions: { expiresIn: '10d' }, // 设置存在时间
        };
      },
    }),
  ], // 引入jwt模块
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
