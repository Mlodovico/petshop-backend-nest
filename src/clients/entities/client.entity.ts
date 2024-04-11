import { Pet } from 'src/pets/entities/pet.entity';

export class Client {
  id: number;
  name: string;
  email: string;
  address: string;
  plain: string;
  dogs: Pet[];
}
