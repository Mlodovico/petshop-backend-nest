import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AdminsService {
  async create(createAdminDto: CreateAdminDto) {
    const { password } = createAdminDto;

    const hashedPassword = await hash(password, 10);

    createAdminDto.password = hashedPassword;

    try {
      return 'Admin created with success!';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    console.log(updateAdminDto);
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
