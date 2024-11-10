import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

/**
 * A custom decorator to apply the SerializeInterceptor.
 * Transforms the outgoing response data to match the provided DTO (Data Transfer Object) class.
 * @param {ClassConstructor} dto - The DTO class to which the data should be serialized.
 * @returns {MethodDecorator} A method decorator that applies the SerializeInterceptor.
 */
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * Interceptor that serializes outgoing data according to the provided DTO class.
 * Uses `class-transformer` to transform the data and exclude any extraneous properties.
 */
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
