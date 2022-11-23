import { Module } from '@nestjs/common';
import { HdService } from './hd.service';

@Module({
  providers: [HdService],
  exports: [HdService],
})
export class HdModule {}
