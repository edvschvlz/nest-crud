import { IsString, MaxLength, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDTO {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  document: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  telephone: string;
}

export class UpdateUserDTO extends OmitType(CreateUserDTO, ['password']) {}
