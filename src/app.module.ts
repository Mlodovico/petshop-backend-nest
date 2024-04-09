import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { ClientsService } from './clients/clients.service';
import { AdminsService } from './admins/admins.service';
import { ClientsModule } from './clients/clients.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [PetsModule, ClientsModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService, ClientsService, AdminsService],
})
export class AppModule {}
