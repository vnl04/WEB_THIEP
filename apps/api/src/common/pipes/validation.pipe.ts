import {
  BadRequestException,
  Injectable,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.type || metadata.type !== 'body') {
      return value;
    }

    const object = plainToClass(metadata.metatype, value);

    if (typeof object !== 'object') {
      return value;
    }

    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors
        .map(error => {
          const constraints = error.constraints
            ? Object.values(error.constraints).join(', ')
            : 'Validation failed';
          return `${error.property}: ${constraints}`;
        })
        .join('; ');

      throw new BadRequestException(messages);
    }

    return object;
  }
}
