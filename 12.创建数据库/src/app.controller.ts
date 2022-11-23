import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // 子级路由
  getHello(): any {
    // return this.options;
    return this.appService.getHello();
  }
}
