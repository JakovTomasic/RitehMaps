import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

/**
 * Validates a request body against a zod schema.
 *
 * Request types are erased at runtime, so without this a handler's `body` is
 * whatever was posted. That matters most for /save, where unchecked data used to
 * be written straight over the storage file and could only be noticed after the
 * next restart failed to parse it.
 */
export class ZodValidationPipe<T> implements PipeTransform<unknown, T> {

  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      // Issue messages describe the expected shape, never the submitted value,
      // so this can't echo a password back to the caller.
      throw new BadRequestException(
        result.error.issues.map(issue => `${issue.path.join('.') || 'body'}: ${issue.message}`),
      );
    }
    return result.data;
  }
}
