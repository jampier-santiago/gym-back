// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
