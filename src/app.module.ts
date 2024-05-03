import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { AdminsModule } from './admins/admins.module';
import { PetsService } from './pets/pets.service';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [ClientsModule, AdminsModule, PetsModule],
  providers: [PetsService],
})
export class AppModule {}
