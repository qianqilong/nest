import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  constructor(private options: Record<string, any>) {}
  public connect() {
    return '<h1>连接数据库</h1>' + '开发环境' + this.options.url;
  }
}
