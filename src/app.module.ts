import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { AdminsModule } from './admins/admins.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [ClientsModule, AdminsModule, PetsModule],
  providers: [],
})
export class AppModule {}
