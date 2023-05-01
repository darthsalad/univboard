import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ClipDocument = Clip & Document;

@Schema()
export class Clip {
  @Prop()
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  createdOn: Date;

  @Prop({ required: true })
  modifiedOn: Date;

  @Prop({ required: true })
  owner: mongoose.Types.ObjectId;

  @Prop()
  labels: string[];

  @Prop()
  collaborators: string[];

  @Prop()
  pinned: boolean;

  @Prop()
  archived: boolean;

  @Prop()
  backdrop: string;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
