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
      console.log(error);
      return error;
    }
  }

  async findAll() {
    try {
      const getAdmins = await this.prismaService.admins.findMany();
      console.log({ getAdmins });
      return getAdmins;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const getAdmin = await this.prismaService.admins.findUnique({
        where: { id },
      });

      return getAdmin;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    console.log(updateAdminDto);
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
