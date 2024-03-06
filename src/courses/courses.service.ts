import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesService {
  constructor(@InjectModel('Course') private readonly courseModel: Model<any>) {}

  async getAllCourses(): Promise<any[]> {
    return await this.courseModel.find();
  }

  async getCourse(id: string): Promise<any | null> {
    try {
      const course = await this.courseModel.findById(id);
  
      if (!course) {
        throw new NotFoundException('Course not found');
      }
  
      return course;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error while getting course:', error);
  
      // You can rethrow the original error or throw a more specific one
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async createCourse(courseData: any): Promise<any> {
    try {
      const createdCourse = new this.courseModel(courseData);
      return await createdCourse.save();
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error while getting course:', error);
  
      // You can rethrow the original error or throw a more specific one
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updateCourse(id: string, courseData: any): Promise<any | null> {
    const existingCourse = await this.courseModel.findById(id);
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }
    try {
      await this.courseModel.findByIdAndUpdate(id, courseData).exec();
      return await this.courseModel.findById(id).exec();
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error while getting course:', error);
  
      // You can rethrow the original error or throw a more specific one
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async deleteCourse(id: string): Promise<void> {
    const existingCourse = await this.courseModel.findById(id);
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }
    try {
      await this.courseModel.findByIdAndDelete(id).exec();
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error while getting course:', error);
  
      // You can rethrow the original error or throw a more specific one
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}