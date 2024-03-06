import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CoursesService } from './courses.service';
import { Model } from 'mongoose';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let courseModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getModelToken('Course'),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue(null),
            exec: jest.fn(),
            save: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue(null),
            findByIdAndDelete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();
  
    coursesService = module.get<CoursesService>(CoursesService);
    courseModel = module.get<Model<any>>(getModelToken('Course'));
  });
  

  describe('getAllCourses', () => {
    it('should return an array of courses', async () => {
      const mockCourses = [{ title: 'Course 1' }, { title: 'Course 2' }];
      jest.spyOn(courseModel, 'find').mockReturnValueOnce(mockCourses as any);

      const result = await coursesService.getAllCourses();

      expect(result).toEqual(mockCourses);
    });
  });

  describe('getCourse', () => {
    it('should return a course by ID', async () => {
      const mockCourse = { title: 'Course 1' };
      jest.spyOn(courseModel, 'findById').mockReturnValueOnce(mockCourse as any);

      const result = await coursesService.getCourse('mockId');

      expect(result).toEqual(mockCourse);
    });

    it('should throw NotFoundException if course is not found', async () => {
      jest.spyOn(courseModel, 'findById').mockResolvedValueOnce(null);


    });

    it('should throw InternalServerErrorException on database error', async () => {
      jest.spyOn(courseModel, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

    });
  });

  // Add tests for createCourse, updateCourse, and deleteCourse methods similarly

  // describe('createCourse', () => {
  //   // Add tests for createCourse method
  // });

  // describe('updateCourse', () => {
  //   // Add tests for updateCourse method
  // });

  // describe('deleteCourse', () => {
  //   // Add tests for deleteCourse method
  // });
});
