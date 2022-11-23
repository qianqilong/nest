import { IsNotEmpty, Validate } from 'class-validator';
import { IsConfirmed } from './rules/isConfirmed.rule';
import { IsNoExists } from './rules/isNoExists.rule';

export default class UserinfoDTO {
  @IsNotEmpty({ message: '用户名不能为空！' })
  @IsNoExists('user', { message: '用户已经存在！' }) //查表
  username: string;
  @IsNotEmpty({ message: '密码不能为空！' })
  @Validate(IsConfirmed, { message: '确认密码输入错误！' })
  password: string;
}
