import { Module } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipSchema } from 'schema/clips.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'schema/users.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Clip', schema: ClipSchema },
    ]),
  ],
  controllers: [ClipsController],
  providers: [ClipsService],
})
export class ClipsModule {}
