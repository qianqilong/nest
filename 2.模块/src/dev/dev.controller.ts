import { Controller, Get } from '@nestjs/common';
import { HdService } from 'src/hd/hd.service';
import { DevService } from './dev.service';

@Controller('dev')
export class DevController {
  constructor(
    private readonly devservice: DevService,
    private readonly hdservice: HdService,
  ) {}

  @Get()
  getDev(): string {
    return this.devservice.findDev() + this.hdservice.findHd();
  }
}
