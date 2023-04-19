import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
