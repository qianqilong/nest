import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptor/Transform.interceptor';
import { ImageUpload } from './decorator/upload.decorator';

@Controller('upload')
@UseInterceptors(new TransformInterceptor())
export class UploadController {
  @Post('image')
  @ImageUpload()
  image(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
