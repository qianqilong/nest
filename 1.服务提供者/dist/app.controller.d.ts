import { AppService } from './app.service';
import { DbService } from './db/db.service';
export declare class AppController {
    private readonly appService;
    private readonly hdService;
    private readonly dbService;
    constructor(appService: AppService, hdService: any, dbService: DbService);
    getHello(): string;
    getHd(): string;
    getDb(): string;
}
