import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HdService } from './hd/hd.service';
import { config } from 'dotenv';
import { join } from 'path';
import { Configser } from './config.service';
import { DbService } from './db/db.service';

config({ path: join(__dirname, '../.env') });
console.log(process.env.NODE_ENV);
const US = {
  // 静态提供者
  provide: 'US',
  useValue: {
    name: 'nest',
  },
};
const HD = {
  provide: 'HD',
  useClass: process.env.NODE_ENV === 'development' ? HdService : AppService,
};

@Module({
  // 装饰器
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    HD,
    US,
    Configser,
    {
      provide: 'DbService',
      // DbService依赖于configser
      inject: ['Configser'],
      useFactory(configser) {
        console.log(configser);
        return new DbService(configser);
      },
    },
  ], // 提供服务
})
export class AppModule {}
