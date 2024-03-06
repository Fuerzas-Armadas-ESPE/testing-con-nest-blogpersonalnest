import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from 'src/modules/request-log/topic.schema';

@Controller('courses/:courseId/topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getAllTopics(@Param('courseId') courseId: string): Promise<Topic[]> {
    return await this.topicsService.getAllTopics(courseId);
  }

  @Post()
  async createTopic(
    @Param('courseId') courseId: string,
    @Body('teacher') teacher: string,
    @Body('subject') subject: string,
  ): Promise<Topic> {
    return await this.topicsService.createTopic({courseId, teacher, subject});
  }
}