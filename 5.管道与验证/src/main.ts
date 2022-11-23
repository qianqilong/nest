import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ArticleFilter } from './filter/article.filter';
// import { ValidationPipe } from '@nestjs/common';
import { validate } from './pipe/Validate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局管道
  app.useGlobalPipes(new validate());
  // 全局过滤器
  app.useGlobalFilters(new ArticleFilter());
  await app.listen(3000);
}
bootstrap();
