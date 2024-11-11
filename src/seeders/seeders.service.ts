// Dependencies
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Rol } from 'rols/entities/rol.entity';

// Services
import { UsersService } from 'users/users.service';
import { CreateUserDto } from 'users/dto/create-user.dto';

@Injectable()
export class SeedersService {
  constructor(
    @InjectRepository(Rol)
    private readonly roltRepository: Repository<Rol>,
    private readonly usersService: UsersService,
  ) {}

  async runSeeders() {
    try {
      await this.seedersForRoles();
      await this.seedersForUsers();

      return 'Seeders run successfully';
    } catch (error) {
      return error;
    }
  }

  /**
   * Seeds the database with predefined roles.
   *
   * This method creates and saves roles such as 'admin' and 'user'
   * into the database using the `roltRepository`.
   *
   * @returns {Promise<void>} A promise that resolves when the seeding is complete.
   */
  async seedersForRoles() {
    const rols: Array<string> = ['admin', 'user'];

    for (const rol of rols) {
      const newRol = this.roltRepository.create({ name: rol });
      await this.roltRepository.save(newRol);
    }
  }

  /**
   * Seeds the database with a default admin user.
   *
   * This method creates a user with predefined attributes such as email, password,
   * role, date of birth, gender, name, height, weight, last name, lessons, occupation,
   * RH, and lessons description. The user is then added to the database using the
   * `usersService.create` method.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the seeding is complete.
   */
  async seedersForUsers() {
    const User: CreateUserDto = {
      email: 'admin@gmail.com',
      password: 'admin1234',
      rol: 1,
      dateOfBirthDay: new Date().toISOString(),
      gender: 'M',
      name: 'Admin',
      height: '1.75',
      weight: '75',
      lastName: 'Admin',
      lessions: false,
      occupation: 'Admin',
      RH: 'O+',
      lessionsDescription: '',
    };

    await this.usersService.create(User);
  }
}
