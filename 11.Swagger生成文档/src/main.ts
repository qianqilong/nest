import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalFilter } from './filter/global.filter';
import { validatePipe } from './pipe/validate.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new validatePipe());
  app.useGlobalFilters(new GlobalFilter());
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证,添加token
    .setTitle('Nest zero to one') // 文档标题
    .setDescription('The nest-zero-to-one API description') // 文章副标题
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3000);
}
bootstrap();
