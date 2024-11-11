// Dependencies
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Dto
import { CreateExerciseDto } from './dto/create-exercise.dto';

// Entities
import { Exercise } from './entities/exercise.entity';
import { CategoryExercise } from 'category-exercises/entities/category-exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(CategoryExercise)
    private readonly categoryExerciseRepository: Repository<CategoryExercise>,
  ) {}

  /**
   * Creates a new exercise entry in the repository.
   *
   * @param createExerciseDto - Data Transfer Object containing the details of the exercise to be created.
   * @returns A promise that resolves to an object containing the id, name, description, and image of the created exercise.
   * @throws Will throw an error if the exercise creation or saving process fails.
   */
  async create(createExerciseDto: CreateExerciseDto) {
    const { name, description, image, category } = createExerciseDto;

    try {
      const exercise = this.exerciseRepository.create({
        name,
        description,
        image,
      });

      const categoryExist = await this.categoryExerciseRepository.findOneBy({
        id: category,
      });

      const finalData = await this.exerciseRepository.save({
        ...exercise,
        categoryExercise: categoryExist,
      });

      return {
        id: finalData.id,
        name: finalData.name,
        description: finalData.description,
        image: finalData.image,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(category?: number) {
    try {
      let categoryId: number | undefined;

      if (category) {
        const existCategory = await this.categoryExerciseRepository.findOneBy({
          id: category,
        });

        if (!existCategory) {
          throw new NotFoundException('Category not found');
        }

        categoryId = existCategory.id;
      }

      const exercises = await this.exerciseRepository.find({
        where: categoryId ? { categoryExercise: { id: categoryId } } : {},
      });

      return exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        image: exercise.image,
      }));
    } catch (error) {
      if (error.message === 'Category not found')
        throw new NotFoundException(error.message);

      throw new BadRequestException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
