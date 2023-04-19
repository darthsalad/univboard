import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    createAuthDto: RegisterAuthDto,
  ): Promise<{ message: string; user: User }> {
    const user = await this.userModel.findOne({ email: createAuthDto.email });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    createAuthDto.password = hashedPassword;
    const newUser = new this.userModel(createAuthDto);
    await newUser.save();
    return {
      message: 'User created successfully',
      user: newUser,
    };
  }

  async login(
    loginDto: LoginAuthDto,
  ): Promise<{ message: string; token: string; user: User }> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = this.jwtService.sign(payload);
    return {
      message: 'User logged in successfully',
      token,
      user,
    };
  }

  async authStatus(token: string): Promise<{ user: UserDocument }> {
    if (!token) {
      throw new UnauthorizedException('No JWT token found in cookie');
    }
    const payload = this.jwtService.verify(token);
    const user = await this.userModel.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException('Invalid JWT token');
    }
    return {
      user: user,
    };
  }

  async findAll(): Promise<any> {
    const users = await this.userModel.find();
    if (!users) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
