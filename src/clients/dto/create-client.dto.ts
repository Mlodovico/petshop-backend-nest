import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
}
