import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { RequestInfo } from '../types/request-info.type';

@Injectable()
export class RequestInfoInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ipAddress: string = request.connection.remoteAddress;
    const requestInfo: RequestInfo = { ipAddress };
    this.cls.set('request-info', requestInfo);
    return next.handle();
  }
}
