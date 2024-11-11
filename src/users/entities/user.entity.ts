// Dependencies
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

// Entities
import { Rol } from 'rols/entities/rol.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'last_name' })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 155,
    nullable: false,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column({ type: 'varchar', length: 250, nullable: false, name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: false, name: 'weight' })
  weight: string;

  @Column({ type: 'varchar', length: 10, nullable: false, name: 'height' })
  height: string;

  @Column({ type: 'varchar', length: 10, nullable: false, name: 'RH' })
  RH: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'date_of_birth_day',
  })
  dateOfBirthDay: string;

  @Column({ type: 'char', length: 1, nullable: false, name: 'gender' })
  gender: string;

  @Column({ type: 'varchar', length: 150, nullable: false, name: 'occupation' })
  occupation: string;

  @Column({
    type: 'boolean',
    nullable: false,
    name: 'lessions',
    default: false,
  })
  lessions: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'lessions_description',
  })
  lessionsDescription: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    default: null,
  })
  deletedAt: Date;

  @ManyToOne(() => Rol, (rol) => rol.id)
  rol: Rol;
}
