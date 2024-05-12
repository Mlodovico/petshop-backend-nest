import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PetsModule } from 'src/pets/pets.module';

@Module({
  imports: [PrismaModule, PetsModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
