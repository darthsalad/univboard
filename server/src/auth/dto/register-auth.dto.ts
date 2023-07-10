import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsDate()
  createdOn: Date = new Date();

  @IsOptional()
  @IsArray()
  clips: string[] = [];

  @IsString()
  resetPasswordToken = '';

  @IsDate()
  resetPasswordExpires: Date = new Date();
}
