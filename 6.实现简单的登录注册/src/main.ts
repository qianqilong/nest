import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalFilter } from './filter/global.filter';
import { validatePipe } from './pipe/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new validatePipe());
  app.useGlobalFilters(new GlobalFilter());
  await app.listen(3000);
}
bootstrap();
