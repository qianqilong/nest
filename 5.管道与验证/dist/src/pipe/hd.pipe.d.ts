import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class HdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
