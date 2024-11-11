// Dependencies
import { Controller, Get, Post, Body, Query } from '@nestjs/common';

// Services
import { ExercisesService } from './exercises.service';

// Dto
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  findAll(@Query('category') category: string) {
    return this.exercisesService.findAll(+category);
  }
}
