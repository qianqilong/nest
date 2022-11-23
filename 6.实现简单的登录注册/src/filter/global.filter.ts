import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch()
export class GlobalFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof BadRequestException) {
      const responseObj = exception.getResponse() as any;
      return response.status(400).json({
        code: 400,
        message: responseObj.message.map((error) => {
          const info = error.split(':');
          return { field: info[0], message: info[1] };
        }),
      });
    }
    return response;
  }
}
