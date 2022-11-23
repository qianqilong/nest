import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigService, ConfigType } from '@nestjs/config'
import appConfig from './config/app.config'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
    @Inject(appConfig.KEY)
    private app: ConfigType<typeof appConfig> /* type getType<T extends () => any> = T extends () => infer U ? U : T
    type appConfigType = getType<typeof appConfig> 类型提示工具*/,
  ) {}

  @Get() // 子级路由
  getHello(): any {
    // return this.appService.getHello()
    // return process.env.APP_Name (node直接读取配置文件)
    // console.log(this.config.get('app.isDev'))
    // return this.config.get('upload.exts')
    return this.app.name
  }
}
