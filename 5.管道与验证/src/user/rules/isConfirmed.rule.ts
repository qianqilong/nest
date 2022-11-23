import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsConfirmed implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    /**
{
  targetName: 'UserinfoDTO',
  property: 'password',
  object: UserinfoDTO {
    username: '11',
    password: '1111',
    password_confirmed: '111111'
  },
  value: '1111',
  constraints: undefined
}
     */
    return value === args.object[args.property + '_confirmed'];
  }

  defaultMessage() {
    // 默认消息
    return '数据不匹配';
  }
}
