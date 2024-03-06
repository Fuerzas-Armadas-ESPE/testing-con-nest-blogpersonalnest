import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TopicsService {
  constructor(@InjectModel('Topic') private readonly topicModel: Model<any>) {}

  async getAllTopics(courseId: string): Promise<any[]> {
    return await this.topicModel.find({ courseId }).exec();
  }

  async getTopic(id: string): Promise<any | null> {
    try {
      const topic = await this.topicModel.findById(id).exec();
      if (!topic) {
        throw new NotFoundException('Topic not found');
      }
      return topic;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
  

  async createTopic(topicData: any): Promise<any> {
    try {
      const createdTopic = new this.topicModel(topicData);
      return await createdTopic.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateTopic(id: string, topicData: any): Promise<any | null> {
    const existingTopic = await this.topicModel.findById(id).exec();
    if (!existingTopic) {
      throw new NotFoundException('Topic not found');
    }
    try {
      await this.topicModel.findByIdAndUpdate(id, topicData).exec();
      return await this.topicModel.findById(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteTopic(id: string): Promise<void> {
    const existingTopic = await this.topicModel.findById(id).exec();
    if (!existingTopic) {
      throw new NotFoundException('Topic not found');
    }
    try {
      await this.topicModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}