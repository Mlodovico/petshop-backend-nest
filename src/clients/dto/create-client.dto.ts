import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  address: string;

  @IsNotEmpty()
  @IsString()
  plain: string;

  @IsNotEmpty()
  pet: Array<{
    name: string;
    breed: string;
    birthdate: number;
    weight: number;
  }>;
}
