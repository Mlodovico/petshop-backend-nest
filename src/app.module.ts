import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { AdminsModule } from './admins/admins.module';
import { PetsModule } from './pets/pets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClientsModule, AdminsModule, PetsModule, AuthModule],
  providers: [],
})
export class AppModule {}
