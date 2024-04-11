import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Pet } from 'src/pets/entities/pet.entity';

export class CreateClientDto {
  //   @IsNotEmpty()
  //   @IsUUID(4)
  id: number;

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
  dogs: Array<Pet>;
}
