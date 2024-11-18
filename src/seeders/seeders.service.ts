// Dependencies
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Rol } from 'rols/entities/rol.entity';

// Services
import { UsersService } from 'users/users.service';
import { CategoryExercisesService } from 'category-exercises/category-exercises.service';
import { ExercisesService } from 'exercises/exercises.service';

// Dto's
import { CreateUserDto } from 'users/dto/create-user.dto';
import { CreateExerciseDto } from 'exercises/dto/create-exercise.dto';

@Injectable()
export class SeedersService {
  constructor(
    @InjectRepository(Rol)
    private readonly roltRepository: Repository<Rol>,
    private readonly usersService: UsersService,
    private readonly categoryExercisesService: CategoryExercisesService,
    private readonly exercisesService: ExercisesService,
  ) {}

  async runSeeders() {
    try {
      await this._seedersForRoles();
      await this._seedersForUsers();
      await this._seedersForCategoryExercises();
      await this._seedersForExercises();

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
  private async _seedersForRoles() {
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
  private async _seedersForUsers() {
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

  /**
   * Seeds the database with predefined categories for exercises.
   *
   * This method creates a set of exercise categories such as 'Tonificar',
   * 'Fuerza', and 'Bajar de peso' by calling the `create` method of
   * `categoryExercisesService` for each category.
   *
   * @private
   * @returns {Promise<void>} A promise that resolves when all categories have been created.
   */
  private async _seedersForCategoryExercises() {
    const categories: Array<string> = ['Tonificar', 'Fuerza', 'Bajar de peso'];

    for (const category of categories) {
      await this.categoryExercisesService.create({ name: category });
    }
  }

  private async _seedersForExercises() {
    const exercises: Array<CreateExerciseDto> = [
      {
        name: 'Sentadillas (Squats)',
        description:
          'Las sentadillas son ejercicios fundamentales para tonificar los músculos de las piernas y glúteos. Consisten en flexionar las rodillas y caderas, bajando el cuerpo como si se fuera a sentar, y luego regresar a la posición inicial. Este movimiento fortalece cuádriceps, isquiotibiales y glúteos.',
        image: 'https://i.blogs.es/93405c/sentadilla/450_1000.webp',
        category: 1,
      },
      {
        name: 'Plancha (Plank)',
        description:
          'La plancha es un ejercicio isométrico que fortalece el núcleo (core), incluyendo abdominales, espalda baja y hombros. Se realiza manteniendo el cuerpo en línea recta desde la cabeza hasta los talones, apoyado sobre los antebrazos y las puntas de los pies.',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPDug1t8G7EEtXV78GVygF40Q_sjxueq1Jxw&s',
        category: 1,
      },
      {
        name: 'Elevaciones laterales de hombros (Lateral Raises)',
        description:
          ' Este ejercicio tonifica los músculos del hombro. De pie, con una mancuerna en cada mano y los brazos a los lados, se levantan los brazos lateralmente hasta la altura de los hombros, manteniendo una ligera flexión en los codos, y luego se bajan lentamente.',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_hxTd5W6G26yASt5z0x48HtGN4mzbqZidbw&s',
        category: 1,
      },
      {
        name: 'Peso muerto (Deadlift)',
        description:
          ' El peso muerto es un ejercicio compuesto que fortalece la cadena posterior, incluyendo espalda baja, glúteos y piernas. Consiste en levantar una barra con peso desde el suelo hasta la altura de las caderas, manteniendo la espalda recta y las rodillas ligeramente flexionadas.',
        image:
          'https://www.programadoce.com/wp-content/uploads/5-PASOS-PARA-UN-BUEN-PESO-MUERTO-1024x1024.jpg',
        category: 2,
      },
      {
        name: 'Press de banca (Bench Press)',
        description:
          'Este ejercicio trabaja principalmente el pecho, los hombros y los tríceps. Acostado en un banco plano, se sostiene una barra con peso a la altura del pecho y se empuja hacia arriba hasta extender completamente los brazos, luego se baja controladamente.',
        image:
          'https://www.basic-fit.com/dw/image/v2/BDFP_PRD/on/demandware.static/-/Library-Sites-basic-fit-shared-library/default/dw39c2b532/Roots/Blog/Blog-Header/1088x612/19-10-blog-fitness-training-benchpress-plateau.png?sw=968',
        category: 2,
      },
      {
        name: 'Dominadas (Pull-Ups)',
        description:
          'Las dominadas son un ejercicio de peso corporal que fortalece la espalda y los bíceps. Colgado de una barra con las palmas hacia adelante, se tira del cuerpo hacia arriba hasta que la barbilla supera la barra, y luego se baja lentamente.',
        image:
          'https://eresfitness.com/wp-content/uploads/2020/02/06521105-Pull-up_Back_max.png',
        category: 2,
      },
      {
        name: 'Burpees',
        description:
          'Los burpees son un ejercicio de alta intensidad que combina sentadillas, flexiones y saltos, lo que ayuda a quemar calorías rápidamente y mejora la resistencia cardiovascular. Ideal para perder peso, pues involucra múltiples grupos musculares.',
        image:
          'https://s3.ppllstatics.com/rc/www/multimedia/2024/07/18/burpees-kmd-U2207519490078OH-1200x840@RC.jpeg',
        category: 3,
      },
      {
        name: 'Mountain Climbers',
        description:
          'Este ejercicio de peso corporal simula el movimiento de escalar, ayudando a quemar grasa y tonificar abdomen, brazos y piernas. Comienza en posición de plancha alta y lleva las rodillas alternativamente hacia el pecho a un ritmo rápido.',
        image:
          'https://training.fit/wp-content/uploads/2020/03/bergsteiger-fitnessband.png',
        category: 3,
      },
      {
        name: 'Saltos de tijera (Jumping Jacks)',
        description:
          'Un ejercicio aeróbico que ayuda a quemar calorías al trabajar todo el cuerpo. De pie, salta separando las piernas y levantando los brazos, luego vuelve a juntar los pies y baja los brazos. Este movimiento repetitivo ayuda a aumentar la frecuencia cardíaca.',
        image:
          'https://s2.abcstatics.com/media/bienestar/2020/04/08/jumping-jack-kS4H--1248x698@abc.jpg',
        category: 3,
      },
    ];

    for (const exercise of exercises) {
      await this.exercisesService.create(exercise);
    }
  }
}
