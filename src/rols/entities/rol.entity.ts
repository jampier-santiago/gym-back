// Dependencies
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

// Entities
import { User } from 'users/entities/user.entity';

@Entity({ name: 'rols' })
export class Rol {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'name' })
  name: string;

  @OneToMany(() => User, (user) => user.rol)
  users: User[];

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  deletedAt: Date;
}
