import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export class ClientNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super();
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
      {
        cause: new Error(message),
      },
    );
  }
}
