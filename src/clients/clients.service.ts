import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from 'src/pets/dto/create-pet.dto';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {}
  async create(clientData: CreateClientDto, petsData: CreatePetDto[]) {
    try {
      const { document } = clientData;

      const findClient = await this.prismaService.client.findMany({
        where: {
          document: document,
        },
      });

      if (findClient.length > 0) {
        throw 'Client already exists!';
      }

      const createdClient = await this.prismaService.client.create({
        data: clientData,
      });

      if (petsData && petsData.length > 0) {
        await Promise.all(
          petsData.map(async (pet) => {
            await this.prismaService.pet.create({
              data: {
                ...pet,
                clientId: createdClient.id,
              },
            });
          }),
        );
      }

      return `Client ${clientData.name} created with success!`;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll() {
    try {
      const getClients = await this.prismaService.client.findMany();
      const getPets = await this.prismaService.pet.findMany();

      const clientsWithPets = getClients.map((client) => {
        const pets = getPets.filter((pet) => pet.clientId === client.id);

        return pets;
      });

      console.log(clientsWithPets);

      return getClients;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findOne(id: number) {
    try {
      const getClient = await this.prismaService.client.findUnique({
        where: { id },
      });

      return getClient ? getClient : 'Client not found!';
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {}

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
