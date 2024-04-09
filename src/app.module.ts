import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { ClientsModule } from './clients/clients.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [PetsModule, ClientsModule, AdminsModule],
})
export class AppModule {}
