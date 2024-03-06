// topics.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { TopicsService } from './topics.service';

describe('TopicsService', () => {
  let topicsService: TopicsService;
  let topicModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicsService,
        {
          provide: getModelToken('Topic'),
          useValue: Model,
        },
      ],
    }).compile();

    topicsService = module.get<TopicsService>(TopicsService);
    topicModel = module.get<Model<any>>(getModelToken('Topic'));
  });

  describe('getTopic', () => {
    it('should throw NotFoundException if topic is not found', async () => {
      const id = 'nonExistentId';

      jest.spyOn(topicModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockRejectedValueOnce(new NotFoundException('Topic not found')),
      } as any);

      
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      const id = 'exampleId';

      jest.spyOn(topicModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockRejectedValueOnce(new Error('Unexpected error')),
      } as any);

      
    });
  });

  // Agrega pruebas similares para otros métodos del servicio según sea necesario
});
