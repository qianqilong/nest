import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Logger } from 'src/utils/log4js';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: Record<string, any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const responseObj = exception.getResponse() as any;
    let message = '';
    if (exception.status === 400) {
      message = responseObj.message.map((error) => {
        const info = error.split(':');
        return { field: info[0], message: info[1] };
      });
    } else if (exception.status === 401) {
      message = '用户身份已过期，请重新登录';
    } else if (exception.status === 403) {
      message = '权限不够，请重新登录';
    }
    const logFormat = ` 
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${JSON.stringify(message)} \n `;
    Logger.error(logFormat);
    return response.status(400).json({
      code: status,
      message,
    });
  }
}
