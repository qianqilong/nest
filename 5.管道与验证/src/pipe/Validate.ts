import { ValidationError, ValidationPipe } from '@nestjs/common';

// 继承系统的管道方法
export class validate extends ValidationPipe {
  protected mapChildrenToValidationErrors(
    error: ValidationError,
    parentPath?: string,
  ): ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath);
    errors.map((error) => {
      for (const key in error.constraints) {
        error.constraints[key] = error.property + ':' + error.constraints[key];
      }
    });
    return errors;
  }
}
