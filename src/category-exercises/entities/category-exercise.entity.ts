// Dependencies
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

// Entities
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity({ name: 'category_exercises' })
export class CategoryExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.categoryExercise)
  exercises: Exercise[];
}
