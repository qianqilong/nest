import { Injectable } from '@nestjs/common';

@Injectable()
export class DevService {
  findDev(): string {
    return '我是Dev模块';
  }
}
