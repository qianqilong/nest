import { IsNotEmpty } from 'class-validator';
import { IsNoExistsRule } from 'src/rules/isNoExist.rule';

export default class loginDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('login', 'user', { message: '该用户不存在' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
