import { AppService } from './app.service';
import { ConfigService, ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
export declare class AppController {
    private readonly appService;
    private readonly config;
    private app;
    constructor(appService: AppService, config: ConfigService, app: ConfigType<typeof appConfig>);
    getHello(): any;
}
