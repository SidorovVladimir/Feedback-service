import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUserResponse } from './response/auth-user.response';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() dto: CreateUserDto,
  ): Promise<AuthUserResponse | BadRequestException> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(
    @Body() dto: UserLoginDto,
  ): Promise<AuthUserResponse | BadRequestException> {
    return this.authService.loginUser(dto);
  }
}
