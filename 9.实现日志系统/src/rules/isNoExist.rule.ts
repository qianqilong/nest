import { PrismaClient } from '@prisma/client';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsNoExistsRule(
  state: string, // 注册还是登录
  table: string, // 数据库中的那一张表
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNoExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient();
          //   查询表中是否有该数据
          const flag = await prisma[table].findFirst({
            where: {
              [args.property]: value,
            },
          });
          if (state === 'register') return !Boolean(flag);
          else return Boolean(flag);
        },
      },
    });
  };
}
