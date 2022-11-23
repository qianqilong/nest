import { ValidationError, ValidationPipe } from '@nestjs/common';
export declare class validate extends ValidationPipe {
    protected mapChildrenToValidationErrors(error: ValidationError, parentPath?: string): ValidationError[];
}
