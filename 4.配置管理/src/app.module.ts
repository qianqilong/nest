import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局使用
      load: config, //加载配置文件到.env
    }),
  ],
  controllers: [AppController],
  providers: [AppService], // 提供服务
})
export class AppModule {}
