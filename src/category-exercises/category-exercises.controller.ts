import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryExercisesService } from './category-exercises.service';
import { CreateCategoryExerciseDto } from './dto/create-category-exercise.dto';

@Controller('category-exercises')
export class CategoryExercisesController {
  constructor(
    private readonly categoryExercisesService: CategoryExercisesService,
  ) {}

  @Post()
  create(@Body() createCategoryExerciseDto: CreateCategoryExerciseDto) {
    return this.categoryExercisesService.create(createCategoryExerciseDto);
  }

  @Get('')
  getCategories() {
    return this.categoryExercisesService.getCategories();
  }
}
