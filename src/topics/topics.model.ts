import { Schema, Types } from 'mongoose';


export const TopicSchema = new Schema({
    id: { type: Types.ObjectId, required: true, auto: true },
    courseId: { type: String, required: true },
    teacher: { type: String, required: true },
    subject: { type: String, required: true },
});