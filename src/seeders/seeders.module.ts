// Dependeincies
import { Module } from '@nestjs/common';

// Services
import { SeedersService } from './seeders.service';

// Controllers
import { SeedersController } from './seeders.controller';

// Modules
import { RolsModule } from 'rols/rols.module';
import { UsersModule } from 'users/users.module';
import { CategoryExercisesModule } from 'category-exercises/category-exercises.module';
import { ExercisesModule } from 'exercises/exercises.module';

@Module({
  imports: [RolsModule, UsersModule, CategoryExercisesModule, ExercisesModule],
  controllers: [SeedersController],
  providers: [SeedersService],
})
export class SeedersModule {}
