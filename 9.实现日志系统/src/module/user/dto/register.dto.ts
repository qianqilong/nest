import { IsNotEmpty } from 'class-validator';
import { IsConfirmedRule } from 'src/rules/isConfirmed.rule';
import { IsNoExistsRule } from 'src/rules/isNoExist.rule';

export default class registerDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('register', 'user', { message: '用户名已存在,请更换用户名' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirmedRule({ message: '确认密码与密码不同' })
  password: string;
}
