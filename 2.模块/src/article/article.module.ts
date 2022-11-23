import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';

@Module({
  // imports: [ConfigModule],
  controllers: [ArticleController],
})
export class ArticleModule {}
