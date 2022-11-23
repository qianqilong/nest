import { PrismaClient } from '@prisma/client';
import { AppService } from './app.service';
import createArticleDTO from './dto/createArticle.dto';
export declare class AppController {
    private readonly appService;
    prisma: PrismaClient;
    constructor(appService: AppService);
    getHello(id: number): any;
    add(dto: createArticleDTO): Promise<import(".prisma/client").article>;
}
