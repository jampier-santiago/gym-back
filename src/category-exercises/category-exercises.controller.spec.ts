import { Test, TestingModule } from '@nestjs/testing';
import { CategoryExercisesController } from './category-exercises.controller';
import { CategoryExercisesService } from './category-exercises.service';

describe('CategoryExercisesController', () => {
  let controller: CategoryExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryExercisesController],
      providers: [CategoryExercisesService],
    }).compile();

    controller = module.get<CategoryExercisesController>(CategoryExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
