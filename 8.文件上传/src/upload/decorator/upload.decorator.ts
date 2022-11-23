import {
  applyDecorators,
  MethodNotAllowedException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function fileFilter(type: string) {
  // 对文件类型限制方法的封装
  return (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    // 对文件上传类型限制
    if (!file.mimetype.includes(type))
      callback(new MethodNotAllowedException('文件类型不允许'), false);
    else callback(null, true);
  };
}

export function Upload(filed = 'file', options: MulterOptions) {
  // 对装饰器的聚合
  return applyDecorators(UseInterceptors(FileInterceptor(filed, options)));
}

// 上传图片的封装
export function ImageUpload(filed = 'file') {
  return Upload(filed, {
    limits: { fileSize: Math.pow(1024, 2) * 2 }, // 文件大小
    fileFilter: fileFilter('image'),
  });
}
