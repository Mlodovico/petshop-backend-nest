import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private prismaService: PrismaService) {}
  async create(createAdminDto: CreateAdminDto): Promise<string> {
    const { password } = createAdminDto;

    const hashedPassword = await hash(password, 10);

    createAdminDto.password = hashedPassword;

    try {
      await this.prismaService.admins.create({ data: createAdminDto });

      return 'Admin created with success!';
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const getAdmins = await this.prismaService.admins.findMany();

      return getAdmins;
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const getAdmin = await this.prismaService.admins.findUnique({
        where: { id },
      });

      return getAdmin ? getAdmin : 'Admin not found!';
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const selectedAdmin = await this.prismaService.admins.findUnique({
        where: { id },
      });

      if (!selectedAdmin) {
        return 'Admin not found!';
      }

      this.prismaService.admins.update({
        where: { id },
        data: updateAdminDto,
      });

      return `The admin ${selectedAdmin.name} was updated with success!`;
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}`);
    }
  }

  async remove(id: number) {
    try {
      const selectedAdmin = await this.prismaService.admins.findUnique({
        where: { id },
      });

      if (!selectedAdmin) {
        return 'Admin not found!';
      }

      await this.prismaService.admins.delete({ where: { id } });

      return `Admin removed with success`;
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  }
}
