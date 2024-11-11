// Dependencies
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO's
import { CreateRolDto } from './dto/create-rol.dto';

// Entity
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolsService {
  constructor(
    @InjectRepository(Rol)
    private readonly roltRepository: Repository<Rol>,
  ) {}

  /**
   * Creates a new role using the provided data transfer object.
   *
   * @param createRolDto - The data transfer object containing the details of the role to be created.
   * @returns The created role or an error if the creation fails.
   */
  async create(createRolDto: CreateRolDto) {
    try {
      const { name } = createRolDto;

      const rol = this.roltRepository.create({ name });
      await this.roltRepository.save(rol);

      return rol;
    } catch (error) {
      return error;
    }
  }

  /**
   * Retrieves all records from the repository.
   *
   * @returns {Promise<any>} A promise that resolves to an array of records or an error.
   * @throws {Error} If there is an issue retrieving the records.
   */
  async findAll() {
    try {
      return await this.roltRepository.find();
    } catch (error) {
      return error;
    }
  }
}
