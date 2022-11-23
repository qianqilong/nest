import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ArticlePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
