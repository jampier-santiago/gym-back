import { Test, TestingModule } from '@nestjs/testing';
import { CategoryExercisesService } from './category-exercises.service';

describe('CategoryExercisesService', () => {
  let service: CategoryExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryExercisesService],
    }).compile();

    service = module.get<CategoryExercisesService>(CategoryExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
