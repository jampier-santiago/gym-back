// Dependencies
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEmail,
  MinLength,
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsString()
  @IsNotEmpty()
  height: string;

  @IsString()
  @IsNotEmpty()
  RH: string;

  @IsString()
  @IsEnum(['M', 'F'])
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  dateOfBirthDay: string;

  @IsString()
  @IsNotEmpty()
  occupation: string;

  @IsBoolean()
  @IsNotEmpty()
  lessions: boolean;

  @IsOptional()
  @IsString()
  lessionsDescription: string;

  @IsNumber()
  @IsNotEmpty()
  rol: number;
}
