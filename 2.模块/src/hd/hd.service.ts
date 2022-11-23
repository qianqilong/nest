import { Injectable } from '@nestjs/common';

@Injectable()
export class HdService {
  findHd(): string {
    return '我是Hd模块';
  }
}
