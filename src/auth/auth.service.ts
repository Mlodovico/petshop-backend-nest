import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser(id: number, pass: string): Promise<any> {
    try {
      const admin = await this.prismaService.admins.findUnique({
        where: { id },
      });

      if (admin) {
        const comparePassword = await compare(pass, admin.password);
        console.log(comparePassword);
        const result = admin;
        return result;
      }

      throw new Error('Admin not found!');
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  }

  async login(admin: LoginAdminDto) {
    try {
      const payload = {
        email: admin.email,
        password: admin.password,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  }
}
