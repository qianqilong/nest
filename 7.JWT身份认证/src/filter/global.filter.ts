import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: Record<string, any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // console.log(exception.status);
    if (exception.status === 400) {
      const responseObj = exception.getResponse() as any;
      return response.status(400).json({
        code: 400,
        message: responseObj.message.map((error) => {
          const info = error.split(':');
          return { field: info[0], message: info[1] };
        }),
      });
    } else if (exception.status === 401) {
      return response.status(401).json({
        code: 401,
        message: '用户身份已过期，请重新登录',
      });
    } else if (exception.status === 403) {
      return response.status(401).json({
        code: 403,
        message: '权限不够，请重新登录',
      });
    } else {
      return response.status(404).json({
        code: 404,
      });
    }
    return response;
  }
}
