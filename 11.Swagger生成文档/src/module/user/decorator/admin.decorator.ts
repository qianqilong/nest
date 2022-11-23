import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard));
}
