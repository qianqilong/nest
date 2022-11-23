import { Controller, Get } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly configservice: ConfigService) {}
  @Get()
  index() {
    return 'index' + this.configservice.get('app.name');
  }
}
