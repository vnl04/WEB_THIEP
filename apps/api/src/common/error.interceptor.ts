import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private logger = new Logger(ErrorInterceptor.name);

  intercept(context: ExecutionContext, next): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;

        this.logger.error(
          `${method} ${url} - ${error.message}`,
          error.stack,
        );

        // Handle Prisma unique constraint errors
        if (error.code === 'P2002') {
          const field = error.meta?.target?.[0] || 'field';
          return throwError(
            () => new ConflictException(`${field} already exists`),
          );
        }

        // Handle Prisma record not found errors
        if (error.code === 'P2025') {
          return throwError(
            () => new BadRequestException('Record not found'),
          );
        }

        // Handle Prisma foreign key constraint errors
        if (error.code === 'P2003') {
          return throwError(
            () => new BadRequestException('Referenced record does not exist'),
          );
        }

        // Handle Prisma validation errors
        if (error.code === 'P2007') {
          return throwError(
            () => new BadRequestException('Data validation error'),
          );
        }

        // Handle class-validator errors (DTO validation)
        if (Array.isArray(error.message)) {
          const messages = error.message.map((msg: any) => {
            if (typeof msg === 'object' && msg.constraints) {
              return Object.values(msg.constraints).join(', ');
            }
            return msg;
          }).join('; ');
          return throwError(
            () => new BadRequestException(messages),
          );
        }

        // Handle validation errors
        if (error.response?.statusCode === 400) {
          return throwError(() => error);
        }

        // Handle authorization errors
        if (error.status === 401 || error.status === 403) {
          return throwError(() => error);
        }

        // Handle custom business logic errors
        if (error.status >= 400 && error.status < 500) {
          return throwError(() => error);
        }

        // Default to internal server error
        return throwError(
          () => new InternalServerErrorException('Internal server error'),
        );
      }),
    );
  }
}

export const errorResponse = (message: string, statusCode: number = 400) => {
  return {
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
    },
  };
};
