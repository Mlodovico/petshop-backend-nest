import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PetsService } from 'src/pets/pets.service';
import { ClientNotFoundException } from './exceptions/client-not-found-exception';

@Injectable()
export class ClientsService {
  constructor(
    private prismaService: PrismaService,
    private petsService: PetsService,
  ) {}
  async create(clientData: CreateClientDto) {
    try {
      const { document, pets } = clientData;

      const findClient = await this.prismaService.client.findMany({
        where: {
          document: document,
        },
      });

      if (findClient.length > 0) {
        throw 'Client already exists!';
      }

      const formattedClientData = {
        name: clientData.name,
        email: clientData.email,
        address: clientData.address,
        plain: clientData.document,
        document: clientData.document,
      };

      const { id } = await this.prismaService.client.create({
        data: formattedClientData,
      });

      if (pets && pets.length > 0) {
        await Promise.all(
          pets.map(async (pet) => {
            const formattedPetValue = {
              ...pet,
              clientId: id,
            };

            await this.petsService.create(formattedPetValue);
          }),
        );
      }

      return `Client ${clientData.name} created with success!`;
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}`);
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

      const formattedClientsWithPets = getClients.map((client, index) => {
        return {
          ...client,
          pets: clientsWithPets[index],
        };
      });

      return formattedClientsWithPets;
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const getClient = await this.prismaService.client.findUnique({
        where: { id },
      });
      const getPets = await this.prismaService.pet.findMany({
        where: { clientId: id },
      });

      const formattedClientsWithPets = {
        ...getClient,
        pets: getPets,
      };

      return getClient && getPets
        ? formattedClientsWithPets
        : 'Client not found!';
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}`);
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const selectedClient = await this.prismaService.client.findUnique({
        where: { id },
      });

      console.log(updateClientDto);

      if (!selectedClient) {
        throw new Error('Client not found!');
      }

      await this.prismaService.client.update({
        where: { id },
        data: updateClientDto,
      });

      return `Client ${selectedClient.name} updated with success`;
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}`);
    }
  }

  async remove(id: number) {
    try {
      const selectedClient = await this.prismaService.client.findUnique({
        where: { id },
      });
      const selectedPetsOfClient = await this.prismaService.pet.findMany({
        where: { clientId: id },
      });

      if (!selectedClient) {
        throw new Error("Client doesn't exist!");
      }

      if (selectedPetsOfClient.length > 0) {
        Promise.all(
          selectedPetsOfClient.map(async (pet) => {
            await this.petsService.remove(pet.id);
          }),
        );
      }

      await this.prismaService.client.delete({ where: { id } });

      return `Client ${selectedClient.name} removed with success`;
    } catch (err) {
      throw new Error('Something went wrong: ' + err.message);
    }
  }
}
