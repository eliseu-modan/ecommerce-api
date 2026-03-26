import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class GetAddressesUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string) {
    return this.usersRepository.findAddressesByUserId(userId);
  }
}
