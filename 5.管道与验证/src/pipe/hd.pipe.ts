import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    //{ metatype: [Function: Number], type: 'param', data: 'id' }
    console.log(metadata);
    return metadata.metatype === Number ? +value : value; //处理数据
  }
}
