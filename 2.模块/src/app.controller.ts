import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';

@Controller() //父级路由
export class AppController {
  //相当于private readonly appService= new AppService() 创建了一个服务
  constructor(
    private readonly appService: AppService,
    private readonly configservice: ConfigService,
  ) {}

  @Get() // 子级路由
  getHello(): any {
    // return this.options;
    return this.configservice.get('flies.exts');
  }
}
