// Dependencies
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

// Entities
import { CategoryExercise } from '../../category-exercises/entities/category-exercise.entity';

@Entity({ name: 'exercises' })
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  image: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;

  @ManyToOne(() => CategoryExercise, (categoryExercise) => categoryExercise.id)
  categoryExercise: CategoryExercise;
}
