import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

interface Pet {
  name: string;
  breed: string;
  birthdate: Date;
  weight: number;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {
  name: string;
  email: string;
  document: string;
  address: string;
  plain: string;
  pet: Pet[];
}
