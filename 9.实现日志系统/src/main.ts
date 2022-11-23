import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validatePipe } from './pipe/validate.pipe';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { GlobalFilter } from './filter/global.filter';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // 对JSON数据进行解析
  app.use(express.urlencoded({ extended: true })); // 对表单数据进行解析
  // 上面两项可以让日志中打印出用户添加的信息
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalFilter());
  app.use(logger);
  app.useGlobalPipes(new validatePipe()); // 全局管道

  await app.listen(3000);
}
bootstrap();
