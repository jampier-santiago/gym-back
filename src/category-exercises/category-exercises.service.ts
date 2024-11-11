// Dependencies
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateCategoryExerciseDto } from './dto/create-category-exercise.dto';

// Entities
import { CategoryExercise } from './entities/category-exercise.entity';

@Injectable()
export class CategoryExercisesService {
  constructor(
    @InjectRepository(CategoryExercise)
    private readonly categoryExerciseRepository: Repository<CategoryExercise>,
  ) {}

  /**
   * Creates a new category exercise.
   *
   * @param createCategoryExerciseDto - The data transfer object containing the details of the category exercise to be created.
   * @returns An object containing the name and id of the created category exercise.
   * @throws An error if the creation process fails.
   */
  async create(createCategoryExerciseDto: CreateCategoryExerciseDto) {
    try {
      const { name } = createCategoryExerciseDto;

      const category = this.categoryExerciseRepository.create({ name });
      const dataCategory = await this.categoryExerciseRepository.save(category);

      return {
        category: category.name,
        id: dataCategory.id,
      };
    } catch (error) {
      throw new Error('An error occurred while creating a category exercise');
    }
  }

  /**
   * Retrieves a list of categories from the categoryExerciseRepository.
   *
   * @returns {Promise<{id: number, name: string}[]>} A promise that resolves to an array of category objects, each containing an `id` and `name`.
   * @throws {Error} Throws an error if there is an issue fetching the categories.
   */
  async getCategories() {
    try {
      const categories = await this.categoryExerciseRepository.find();
      return categories.map((category) => ({
        id: category.id,
        name: category.name,
      }));
    } catch (error) {
      throw new Error('An error occurred while fetching categories');
    }
  }
}
