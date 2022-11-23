import {
  ArgumentMetadata,
  BadRequestException,
  // HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ArticlePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToInstance(metadata.metatype, value); // 实例化createArticleDTO的对象
    const err = await validate(obj); // 通过DTO和validate实现信息返回一个promise对象，中间包含没有通过校检的信息以数组的形式呈现
    if (err.length) {
      // 数组长度大于0时遍历错误信息抛出,Object.values读取对象里面的value值
      const messages = err.map((error) => ({
        name: error.property,
        messages: Object.values(error.constraints),
      }));
      // throw new HttpException(messages, HttpStatus.BAD_REQUEST);
      throw new BadRequestException(messages);
      // console.log(messages);
    }

    return value;
  }
}
