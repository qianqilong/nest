import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ArticleFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取http的上下文
    const response = ctx.getResponse(); // 获取上下文的响应对象并返回
    if (exception instanceof BadRequestException) {
      // 判断异常类型 对异常的信息进行处理
      const responseObject = exception.getResponse() as any;
      // console.log(responseObject);
      return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: responseObject.message.map((error) => {
          const info = error.split(':');
          return { field: info[0], message: info[1] };
        }), // 把异常的信息改为对象数组
      });
    }
    return response;
  }
}
