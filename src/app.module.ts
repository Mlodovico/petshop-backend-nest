import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [ClientsModule, AdminsModule],
})
export class AppModule {}
