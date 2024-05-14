import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ClientsService', () => {
  let service: ClientsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService, PrismaService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findOne', () => {
    it('Should return a client with pet', async () => {
      const findUniqueMock = jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'John Doe' });
      const findManyMock = jest
        .fn()
        .mockResolvedValue([{ id: 1, name: 'Fluffy', breed: 'Dog' }]);

      jest
        .spyOn(prismaService.client, 'findUnique')
        .mockImplementation(findUniqueMock);
      jest
        .spyOn(prismaService.pet, 'findMany')
        .mockImplementation(findManyMock);

      const result = await service.findOne(1);

      expect(result).toEqual({
        id: 1,
        name: 'John Doe',
        pets: [{ id: 1, name: 'Fluffy', breed: 'Dog' }],
      });
      expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(findManyMock).toHaveBeenCalledWith({ where: { clientId: 1 } });
    });

    it('Should return "Client not found! if client does not exist', async () => {
      const findUniqueMock = jest.fn().mockResolvedValue(null);

      jest
        .spyOn(prismaService.client, 'findUnique')
        .mockImplementation(findUniqueMock);

      const result = await service.findOne(999);

      expect(result).toEqual('Client not found!');
      expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: 999 } });
    });

    it('Should throw an error if something goes wrong', async () => {
      const findUniqueMock = jest
        .fn()
        .mockResolvedValue(new Error('Database error'));

      jest
        .spyOn(prismaService.client, 'findUnique')
        .mockImplementation(findUniqueMock);

      await expect(service.findOne(1)).rejects.toThrowError('Database error');

      expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('findAll', () => {
    it('Should retun formatted clients with their pets', async () => {
      const clients = [{ id: 1, name: 'John Doe' }];
      const pets = [{ id: 1, name: 'Fluffy', breed: 'Dog' }];

      const findManyMock = jest
        .fn()
        .mockResolvedValueOnce(clients)
        .mockResolvedValueOnce(pets);

      jest
        .spyOn(prismaService.client, 'findMany')
        .mockImplementation(findManyMock);
      jest
        .spyOn(prismaService.pet, 'findMany')
        .mockImplementation(findManyMock);

      const result = await service.findAll();

      expect(result).toEqual([
        {
          id: 1,
          name: 'John Doe',
          pets: [{ id: 1, name: 'Fluffy', breed: 'Dog' }],
        },
      ]);

      expect(findManyMock).toHaveBeenCalledWith();
      expect(findManyMock).toHaveBeenCalledWith();
    });

    it('Should throw an error if something goes wrong', async () => {
      const findManyMock = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));

      jest
        .spyOn(prismaService.client, 'findMany')
        .mockImplementation(findManyMock);
      jest
        .spyOn(prismaService.pet, 'findMany')
        .mockImplementation(findManyMock);

      await expect(service.findAll()).rejects.toThrowError('Database error');

      expect(findManyMock).toHaveBeenCalledWith();
      expect(findManyMock).toHaveBeenCalledWith();
    });
  });
});
