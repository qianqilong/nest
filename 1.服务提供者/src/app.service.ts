import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from './types/config';

@Injectable() // 服务声明
export class AppService {
  constructor(
    @Inject('US') private US: any,
    @Inject('Configser') private configser: ConfigType,
  ) {}
  getHello(): string {
    return 'Hello World!' + ' ' + this.US.name + ' ' + this.configser.url;
  }
}
