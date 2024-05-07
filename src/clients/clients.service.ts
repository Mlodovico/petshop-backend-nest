import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {}
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

      const createdClient = await this.prismaService.client.create({
        data: clientData, // Pass client data without pets
      });

      if (pets && pets.length > 0) {
        await Promise.all(
          pets.map(async (pet) => {
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

      console.log(getClients);

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

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const { pets } = updateClientDto;

      const selectedClient = await this.prismaService.client.findUnique({
        where: { id },
      });

      if (!selectedClient) {
        throw 'Client not found!';
      }

      await this.prismaService.client.update({
        where: { id },
        data: {
          ...updateClientDto,
          pets: {
            create: pets,
          },
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
    console.log(updateClientDto);
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
