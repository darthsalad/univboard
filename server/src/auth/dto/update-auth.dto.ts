import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './register-auth.dto';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto extends PartialType(RegisterAuthDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password: string;
}
