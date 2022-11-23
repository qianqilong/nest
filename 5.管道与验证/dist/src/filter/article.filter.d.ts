import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ArticleFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): any;
}
