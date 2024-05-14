import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPetDto: CreatePetDto) {
    try {
      const { clientId, ...petData } = createPetDto;

      if (!clientId) {
        throw new Error('clientId is required to create a pet');
      }

      const createPet = await this.prismaService.pet.create({
        data: {
          ...petData,
          client: {
            connect: { id: clientId },
          },
        },
      });

      return `Pet ${createPet.name} was created with success!`;
    } catch (err) {
      console.log(err);
      throw new Error(`Something went wrong: ${err.message}`);
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

  async findOne(id: number) {
    try {
      const getPet = await this.prismaService.pet.findUnique({
        where: { id },
      });

      if (!getPet) {
        throw new Error('Pet not found!');
      }

      return getPet;
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}`);
    }
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    try {
      const selectedPet = await this.prismaService.pet.findUnique({
        where: { id },
      });

      if (!selectedPet) {
        throw new Error('Pet not found!');
      }

      await this.prismaService.pet.update({
        where: { id },
        data: updatePetDto,
      });
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}`);
    }
  }

  async remove(id: number) {
    try {
      const selectedPet = await this.prismaService.pet.findUnique({
        where: { id },
      });

      if (!selectedPet) {
        throw new Error('Pet not found!');
      }

      await this.prismaService.pet.delete({ where: { id } });
      return `Pet ${selectedPet.name} removed with success`;
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}`);
    }
  }
}
