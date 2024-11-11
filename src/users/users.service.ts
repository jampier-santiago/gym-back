// Dependencies
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

// Entities
import { User } from './entities/user.entity';
import { Rol } from 'rols/entities/rol.entity';

// Interfaces
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

enum GenderEnum {
  M = 'M',
  F = 'F',
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const {
        RH,
        dateOfBirthDay,
        email,
        gender,
        height,
        lastName,
        lessions,
        lessionsDescription,
        name,
        occupation,
        password,
        rol,
        weight,
      } = createUserDto;

      const rolExist = await this.validateRol(rol);

      if (!rolExist) {
        throw new NotFoundException("The rol doesn't exist");
      }

      const newUser = this.userRepository.create({
        name,
        lastName,
        email,
        password: hashSync(password, 10),
        weight,
        height,
        RH,
        dateOfBirthDay,
        gender,
        occupation,
        lessions,
        lessionsDescription,
        rol: rolExist,
      });

      const userData = await this.userRepository.save(newUser);
      const currentYear = new Date().getFullYear();

      return {
        user: {
          id: userData.id,
          name: userData.name,
          last_name: userData.lastName,
          email: userData.email,
          years: currentYear - new Date(newUser.dateOfBirthDay).getFullYear(),
          gender: GenderEnum[userData.gender],
          rol: {
            id: userData.rol.id,
            name: userData.rol.name,
          },
        },
        token: this._getJWT({
          email: userData.email,
          password: userData.password,
          id: userData.id,
        }),
      };
    } catch (error) {
      if (error.message === "The rol doesn't exist") {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException(error);
    }
  }

  /**
   * Validates the existence of a role by its ID.
   *
   * @param rol - The ID of the role to validate.
   * @returns A promise that resolves to the role entity if found, or null if not found.
   */
  private async validateRol(rol: number) {
    return await this.rolRepository.findOneBy({ id: rol });
  }

  /**
   * Retrieves all users from the repository, including their roles, and maps them to a new format.
   *
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects with the following properties:
   * - `id`: The user's ID.
   * - `name`: The user's first name.
   * - `last_name`: The user's last name.
   * - `email`: The user's email address.
   * - `years`: The user's age calculated from their date of birth.
   * - `gender`: The user's gender as a value from the `GenderEnum`.
   * - `rol`: An object representing the user's role with the following properties:
   *   - `id`: The role's ID.
   *   - `name`: The role's name.
   *
   * @throws {BadRequestException} If an error occurs while retrieving the users.
   */
  async findAll() {
    try {
      const users = await this.userRepository.find({ relations: ['rol'] });

      console.log(users);
      const currentYear = new Date().getFullYear();

      return users.map((user) => ({
        id: user.id,
        name: user.name,
        last_name: user.lastName,
        email: user.email,
        years: currentYear - new Date(user.dateOfBirthDay).getFullYear(),
        gender: GenderEnum[user.gender],
        rol: {
          id: user.rol.id,
          name: user.rol.name,
        },
      }));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * Authenticates a user based on the provided login credentials.
   *
   * @param {LoginUserDto} loginUserDto - The data transfer object containing the user's login credentials.
   * @returns {Promise<{ user: { id: number, name: string, last_name: string, email: string, years: number, gender: string, rol: { id: number, name: string } }, token: string }>}
   * An object containing the authenticated user's details and a JWT token.
   *
   * @throws {NotFoundException} If the user is not found.
   * @throws {BadRequestException} If the provided credentials are invalid.
   */
  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['rol'],
      });

      if (!user) throw new NotFoundException('Invalid credentials');

      if (!compareSync(password, user.password))
        throw new BadRequestException('Invalid credentials');

      return {
        user: {
          id: user.id,
          name: user.name,
          last_name: user.lastName,
          email: user.email,
          years:
            new Date().getFullYear() -
            new Date(user.dateOfBirthDay).getFullYear(),
          gender: GenderEnum[user.gender],
          rol: {
            id: user.rol.id,
            name: user.rol.name,
          },
        },
        token: this._getJWT({
          email: user.email,
          password: user.password,
          id: user.id,
        }),
      };
    } catch (error) {
      if (error.message === 'User not found')
        throw new NotFoundException(error.message);

      if (error.message === 'Invalid credentials')
        throw new BadRequestException(error.message);

      throw new BadRequestException(error);
    }
  }

  /**
   * Removes a user by their ID.
   *
   * @param {number} id - The ID of the user to remove.
   * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
   * @throws {NotFoundException} If the user with the given ID is not found.
   * @throws {BadRequestException} If there is an error during the removal process.
   */
  async remove(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.softDelete({ id });

      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      if (error.message === 'User not found') {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException();
    }
  }

  /**
   * Generates a JSON Web Token (JWT) using the provided payload.
   * @param payload - The payload to be included in the JWT.
   * @returns The generated JWT.
   */
  private _getJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
