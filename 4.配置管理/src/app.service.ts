import { Injectable } from '@nestjs/common'

@Injectable() // 服务声明
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
