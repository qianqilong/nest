import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

//表字段是否唯一
export function IsNoExists(
  table: string, // 数据库中的那一张表
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsConfirmedRule',
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
          return !Boolean(flag);
        },
      },
    });
  };
}
