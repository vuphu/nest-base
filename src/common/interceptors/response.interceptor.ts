import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { isArray } from 'lodash';

@Injectable()
export class ResponseInterceptor<T extends object> implements NestInterceptor {
  constructor(private readonly classType: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data) => {
        const object = plainToClass(this.classType, data);
        const objects = isArray(object) ? object : [object];
        for (const item of objects) {
          const errors = await validate(item, { stopAtFirstError: true, whitelist: true });
          if (errors.length > 0) {
            console.error(errors);
            throw new InternalServerErrorException('Validate Exception');
          }
        }
        return data;
      }),
    );
  }
}
