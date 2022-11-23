import { Inject, Injectable, Optional } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ConfigService {
  // @Optional()不执行依赖注入
  constructor(
    @Inject('options') private options: any,
    @Optional() private config = {},
  ) {
    readdirSync(options.path).map(async (file) => {
      if (file.slice(-2) === 'js') {
        const module = await import(join(options.path, file));
        this.config = { ...this.config, ...module.default() };
      }
    });
  }
  get(path: string) {
    return path.split('.').reduce((pre, item) => {
      return pre[item];
    }, this.config);
  }
}
