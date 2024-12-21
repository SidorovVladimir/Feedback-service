import { IsEmail, IsString } from 'class-validator';

class UserResponse {
  @IsString()
  id: string;

  @IsEmail()
  email: string;
}

export class AuthUserResponse {
  user: UserResponse;

  @IsString()
  token: string;
}
