// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { CategoryExercisesModule } from 'category-exercises/category-exercises.module';

// Services
import { ExercisesService } from './exercises.service';

// Controllers
import { ExercisesController } from './exercises.controller';

// Entities
import { Exercise } from './entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), CategoryExercisesModule],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService, TypeOrmModule],
})
export class ExercisesModule {}
