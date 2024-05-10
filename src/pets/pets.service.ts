import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPetDto: CreatePetDto) {
    try {
      const createPet = await this.prismaService.pet.create({
        data: createPetDto,
      });

      console.log(createPet);

      return `Pet ${createPet.name} was created with success!`;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll() {
    try {
      const getPets = await this.prismaService.pet.findMany();

      console.log(getPets);

      return getPets;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    console.log(updatePetDto);
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
