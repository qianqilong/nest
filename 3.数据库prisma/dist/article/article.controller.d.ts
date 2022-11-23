import { ConfigService } from 'src/config/config.service';
export declare class ArticleController {
    private readonly configservice;
    constructor(configservice: ConfigService);
    index(): string;
}
