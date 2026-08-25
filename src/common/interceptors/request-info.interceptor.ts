import { RequestInfo } from '../types/request-info.type';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RequestInfoInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const ipAddress: string = request.socket.remoteAddress;
    const requestInfo: RequestInfo = { ipAddress };
    this.cls.set('request-info', requestInfo);
    return next.handle();
  }
}
