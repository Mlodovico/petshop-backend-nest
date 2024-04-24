import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

interface Pet {
  name: string;
  breed: string;
  birthdate: Date;
  weight: number;
}

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  plain: string;

  @IsNotEmpty()
  pet: Pet[];
}
