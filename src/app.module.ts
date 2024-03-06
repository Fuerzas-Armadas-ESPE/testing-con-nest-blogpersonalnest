import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtMiddleware } from './auth/jwt.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module'; // Importa el módulo de courses
import { TopicsModule } from './topics/topics.module'; // Importa el módulo de topics

import { MongooseModule } from '@nestjs/mongoose';
import { RequestLogSchema } from './modules/request-log/request-log.schema';
import { RequestLogService } from './modules/request-log/request-log.service';

@Module({
  imports: [
    AuthModule,
    CoursesModule,
    TopicsModule,
    MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature([
      { name: 'RequestLog', schema: RequestLogSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, RequestLogService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('topics');
    consumer.apply(JwtMiddleware).forRoutes('courses');
  }
}