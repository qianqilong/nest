import { Body, Controller, Post } from '@nestjs/common';
import loginDTO from './dto/login.dto';
import registerDTO from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 注册
  @Post('register')
  register(@Body() dto: registerDTO) {
    return this.userService.register(dto);
  }
  // 登录
  @Post('login')
  login(@Body() dto: loginDTO) {
    return this.userService.login(dto);
  }
}
