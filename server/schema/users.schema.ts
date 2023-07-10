import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClipDocument } from './clips.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: new Date() })
  createdOn: Date;

  @Prop({ default: [] })
  clips: ClipDocument[];

  @Prop({ default: '' })
  resetPasswordToken: string;

  @Prop({ default: new Date() })
  resetPasswordExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
