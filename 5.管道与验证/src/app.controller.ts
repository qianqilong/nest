import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Post,
  UseFilters,
  // UsePipes,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppService } from './app.service';
import { HdPipe } from './pipe/hd.pipe';
import { ArticlePipe } from './pipe/createArticle.pipe';
import createArticleDTO from './dto/createArticle.dto';
import { ArticleFilter } from './filter/article.filter';

@Controller()
export class AppController {
  prisma: PrismaClient; // 添加查询
  constructor(private readonly appService: AppService) {
    this.prisma = new PrismaClient();
  }

  // 根据id查询信息
  @Get(':id') // 添加params参数
  // @UsePipes(HdPipe)
  getHello(@Param('id', new DefaultValuePipe(1), HdPipe) id: number): any {
    // 先走管道然后在赋值给后面的id
    return this.prisma.article.findUnique({
      // 查询文章id对应的文章
      where: {
        id: id, // 要求时int类型而传过来的id是string类型
      },
    });
  }

  // 添加文章
  @Post('add')
  // 局部过滤器
  // @UseFilters(new ArticleFilter())

  // async add(@Body(ArticlePipe) dto: createArticleDTO) { // 自定义管道位置
  // 系统自己带了ArticlePipe管道的代码我们只要写dto文件或者继承ValidationPipe类
  async add(@Body() dto: createArticleDTO) {
    const article = await this.prisma.article.create({
      data: {
        title: dto.title,
        content: dto.content,
      },
    });
    return article;
  }
}
