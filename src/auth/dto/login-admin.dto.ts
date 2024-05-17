import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
