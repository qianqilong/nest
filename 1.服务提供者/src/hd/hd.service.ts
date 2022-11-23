import { Injectable } from '@nestjs/common';

@Injectable()
export class HdService {
  findone(): string {
    return 'hd服务';
  }
}
