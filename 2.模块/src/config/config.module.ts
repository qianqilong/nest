import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global() // 全局注册了模块，其他模引入时无需导入
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  static register(options: { path: string }): DynamicModule {
    // 添加动态模块
    return {
      module: ConfigModule,
      providers: [{ provide: 'options', useValue: options }],
      exports: ['options'],
    };
  }
}
