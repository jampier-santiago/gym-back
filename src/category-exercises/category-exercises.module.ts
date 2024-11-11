// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { CategoryExercisesService } from './category-exercises.service';

// Controllers
import { CategoryExercisesController } from './category-exercises.controller';

// Entities
import { CategoryExercise } from './entities/category-exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryExercise])],
  controllers: [CategoryExercisesController],
  providers: [CategoryExercisesService],
  exports: [CategoryExercisesService, TypeOrmModule],
})
export class CategoryExercisesModule {}
