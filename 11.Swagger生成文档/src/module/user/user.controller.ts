import { Body, Controller, Get, Post } from '@nestjs/common';
import loginDTO from './dto/login.dto';
import registerDTO from './dto/register.dto';
import { UserService } from './user.service';
import { Auth } from './decorator/admin.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('用户的注册和登录')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 注册
  @Post('register')
  @ApiBody({
    // 设置swagger的参数
    description: '用户注册',
    type: registerDTO,
  })
  register(@Body() dto: registerDTO) {
    return this.userService.register(dto);
  }
  // 登录
  @Post('login')
  @ApiBody({
    // 设置swagger的参数
    description: '用户登录',
    type: loginDTO,
  })
  login(@Body() dto: loginDTO) {
    return this.userService.login(dto);
  }
  // 测试token
  @Get('test')
  @Auth()
  test() {
    return this.userService.test();
  }
}
