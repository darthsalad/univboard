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
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { S3 } from 'aws-sdk';
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
    file: Express.Multer.File,
  ): Promise<{ message: string; user: User }> {
    const user = await this.userModel.findOne({ email: createAuthDto.email });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const s3 = new S3();
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    createAuthDto.password = hashedPassword;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: file.buffer,
      Key: `${Date.now()}-${file.originalname}`,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    try {
      const avatarUpload = await s3.upload(params).promise();
      createAuthDto.avatar = avatarUpload.Location;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error uploading avatar');
    }
    const newUser = new this.userModel(createAuthDto);
    await newUser.save();
    return {
      message: 'User created successfully',
      user: newUser,
    };
  }

  async login(
    loginDto: LoginAuthDto,
  ): Promise<{ message: string; token: string }> {
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
      token: token,
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

  async profile(uid: string): Promise<User> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async updatePassword(
    uid: string,
    updateAuthDto: UpdateAuthDto,
  ): Promise<{ message: string; user: User }> {
    const hashedPassword = await bcrypt.hash(updateAuthDto.password, 10);
    const user = await this.userModel.findByIdAndUpdate(uid, {
      password: hashedPassword,
    });
    return {
      message: 'Password updated successfully',
      user,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
