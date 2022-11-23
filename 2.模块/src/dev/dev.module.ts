import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { HdModule } from 'src/hd/hd.module';

@Module({
  imports: [HdModule], // 使用其他模块
  providers: [DevService],
  controllers: [DevController],
})
export class DevModule {}
