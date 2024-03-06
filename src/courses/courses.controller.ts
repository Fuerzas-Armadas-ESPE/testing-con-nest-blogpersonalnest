import { Controller, Get, Post, Put, Body, Delete, Param, NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { RequestLogDocument } from '../modules/request-log/request-log.schema';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getAllCourses(): Promise<RequestLogDocument[]> {
    return this.coursesService.getAllCourses();
  }

  @Post()
  async createCourse(@Body() courseData: any): Promise<any> {
    return this.coursesService.createCourse(courseData);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<void> {
    return this.coursesService.deleteCourse(id);
  }

  @Put(':id')
  async updateCourse(@Param('id') id: string, @Body() courseData: any): Promise<any> {
    try {
      const updatedCourse = await this.coursesService.updateCourse(id, courseData);
      if (!updatedCourse) {
        throw new NotFoundException('Course not found');
      }
      return updatedCourse;
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }
}