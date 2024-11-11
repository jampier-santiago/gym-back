import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolsModule } from './rols/rols.module';
import { SeedersModule } from './seeders/seeders.module';
import { CategoryExercisesModule } from './category-exercises/category-exercises.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'gymdb',
      username: 'myuser',
      password: 'mypassword',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    RolsModule,
    SeedersModule,
    CategoryExercisesModule,
    ExercisesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
