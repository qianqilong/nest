import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevModule } from './dev/dev.module';
import { HdModule } from './hd/hd.module';
import { ConfigModule } from './config/config.module';
import { ArticleModule } from './article/article.module';
import { join } from 'path';

@Module({
  // 装饰器
  imports: [
    DevModule,
    HdModule,
    ConfigModule.register({ path: join(__dirname, './configure') }),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService], // 提供服务
})
export class AppModule {}
