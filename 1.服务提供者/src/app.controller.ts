import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { HdService } from './hd/hd.service';
import { DbService } from './db/db.service';

@Controller() //父级路由
export class AppController {
  //相当于private readonly appService= new AppService() 创建了一个服务
  constructor(
    private readonly appService: AppService,
    @Inject('HD')
    private readonly hdService,
    @Inject('DbService')
    private readonly dbService: DbService,
  ) {}

  @Get('a') // 子级路由
  getHello(): string {
    // return 'hello';
    return this.appService.getHello();
  }

  @Get('hd')
  getHd(): string {
    return this.hdService.findone();
  }

  @Get('db')
  getDb(): string {
    return this.dbService.connect();
    // return this.dbService;
  }
}
