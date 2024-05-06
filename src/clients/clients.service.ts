import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {}
  async create(createClientDto: CreateClientDto) {
    try {
      const { pets } = createClientDto;

      console.log(pets);
      // await this.prismaService.client.create({
      //   data: {
      //     ...createClientDto,
      //     pets: {
      //       create: createClientDto.pets,
      //     },
      //   },
      // });

      return `Client ${createClientDto.name} created with success!`;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll() {
    try {
      const getClients = await this.prismaService.client.findMany();

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

  update(id: number, updateClientDto: UpdateClientDto) {
    console.log(updateClientDto);
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
