import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  name: string;
  age: number;
  breed: string;
  category: string;
  details?: string;
}
