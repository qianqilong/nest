import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsConfirmedRule } from 'src/rules/isConfirmed.rule';
import { IsNoExistsRule } from 'src/rules/isNoExist.rule';

export default class registerDTO {
  @ApiProperty({ description: '用户名', example: '' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('register', 'user', { message: '用户名已存在,请更换用户名' })
  username: string;

  @ApiProperty({ description: '密码', example: '' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirmedRule({ message: '确认密码与密码不同' })
  password: string;

  @ApiProperty({ description: '确认密码', example: '' })
  password_confirmed: string;
}
