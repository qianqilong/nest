import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
export declare class AppController {
    private readonly appService;
    private readonly configservice;
    constructor(appService: AppService, configservice: ConfigService);
    getHello(): any;
}
