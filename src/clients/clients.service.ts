import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {}
  async create(createClientDto: CreateClientDto) {
    try {
      console.log(createClientDto);
      await this.prismaService.client.create({ data: createClientDto });

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

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    console.log(updateClientDto);
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
