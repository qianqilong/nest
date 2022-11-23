import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsConfirmed implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(): string;
}
