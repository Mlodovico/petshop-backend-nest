interface Pets {
  name: string;
  breed: string;
  birthdate: number;
  weight: number;
}

export class Client {
  id: number;
  name: string;
  email: string;
  address: string;
  plain: string;
  dogs: Pets[];
}
