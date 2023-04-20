import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  @UseGuards(AuthGuard())
  async findAll(@Res() response: any) {
    const userData = await this.authService.findAll();
    return response.status(200).json({
      users: userData,
    });
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async register(@Body() createAuthDto: RegisterAuthDto, @Res() response: any) {
    const userData = await this.authService.register(createAuthDto);
    return response.status(201).json({
      message: 'User Created',
      user: userData,
    });
  }

  @Post('login')
  @UseInterceptors(FileInterceptor('file'))
  async login(
    @Body() loginDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.authService.login(loginDto);
    return response
      .status(200)
      .cookie('jwt', userData.token, {
        httpOnly: true,
      })
      .json({
        message: 'User logged in successfully',
        token: userData.token,
        user: userData.user,
      });
  }

  @Get()
  async authStatus(@Req() request: any, @Res() response: Response) {
    const token = request.cookies.jwt;
    const res = await this.authService.authStatus(token);
    return response.status(200).json({
      // jwtToken: token,
      id: res.user._id,
      email: res.user.email,
    });
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return response.status(200).json({
      message: 'User logged out successfully',
    });
  }

  @Post('update-password')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async updatePassword(
    @Body() updatePasswordDto: UpdateAuthDto,
    @Req() request: any,
    @Res() response: Response,
  ) {
    const token = request.cookies.jwt;
    const userData = await this.authService.updatePassword(
      token,
      updatePasswordDto,
    );
    return response.status(200).json({
      message: 'Password updated successfully',
      user: userData,
    });
  }
}
