import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course {
  @Prop({ required: true })
  course?: string;

  @Prop({ required: true })
  content?: string;
}

export type CourseDocument = Course & Document;

export const CourseSchema = SchemaFactory.createForClass(Course);