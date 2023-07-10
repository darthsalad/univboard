import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseInterceptors,
  UseGuards,
  Req,
  Patch,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response, Express } from 'express';

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
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() createAuthDto: RegisterAuthDto,
    @Res() response: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userData = await this.authService.register(createAuthDto, file);
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
        secure: true,
        sameSite: 'none',
        maxAge: 2592000000,
        path: '/',
      })
      .json({
        message: 'User logged in successfully',
        token: userData.token,
      });
  }

  @Get()
  async authStatus(@Req() request: Request, @Res() response: Response) {
    const token = request.cookies.jwt;
    const res = await this.authService.authStatus(token);
    return response.status(200).json({
      id: res.user._id,
      email: res.user.email,
      name: res.user.name,
      date: res.user.createdOn,
    });
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return response.status(200).json({
      message: 'User logged out successfully',
    });
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  async profile(@Req() request: any, @Res() response: Response) {
    const uid = request.user._id.toString();
    const userData = await this.authService.profile(uid);
    return response.status(200).json({
      avatar: userData.avatar,
      name: userData.name,
      email: userData.email,
    });
  }

  @Patch('update-password')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async updatePassword(
    @Body() updatePasswordDto: UpdateAuthDto,
    @Req() request: any,
    @Res() response: Response,
  ) {
    const uid = request.user._id.toString();
    const userData = await this.authService.updatePassword(
      uid,
      updatePasswordDto,
    );
    console.log(request.user);
    return response.status(200).json({
      message: 'Password updated successfully',
      user: userData,
    });
  }
}
