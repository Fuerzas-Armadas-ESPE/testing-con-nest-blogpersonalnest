import { Schema } from 'mongoose';

export const CourseSchema = new Schema({
  id: { type: String, required: true },
  course: { type: String, required: true },
  content: { type: String, required: true },
});