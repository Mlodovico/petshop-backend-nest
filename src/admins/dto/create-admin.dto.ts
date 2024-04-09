import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  clearanceLevel: number;
}
