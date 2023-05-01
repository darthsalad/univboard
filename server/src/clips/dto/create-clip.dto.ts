import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateClipDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDate()
  createdOn: Date = new Date();

  @IsDate()
  modifiedOn: Date = new Date();

  @IsEmpty()
  owner: mongoose.Types.ObjectId;

  @IsArray()
  labels: string[] = [];

  @IsArray()
  collaborators: string[] = [];

  @IsBoolean()
  pinned = false;

  @IsBoolean()
  archived = false;

  @IsString()
  backdrop = '';
}
