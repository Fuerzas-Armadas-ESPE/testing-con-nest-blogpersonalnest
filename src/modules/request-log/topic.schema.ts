import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Topic {
  @Prop({ required: true })
  id?: string;

  @Prop({ required: true })
  courseId?: string;

  @Prop({ required: true })
  teacher?: string;

  @Prop({ required: true })
  subject?: string;
}

export type TopicDocument = Topic & Document;

export const TopicSchema = SchemaFactory.createForClass(Topic);