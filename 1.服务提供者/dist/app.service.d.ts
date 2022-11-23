import { ConfigType } from './types/config';
export declare class AppService {
    private US;
    private configser;
    constructor(US: any, configser: ConfigType);
    getHello(): string;
}
