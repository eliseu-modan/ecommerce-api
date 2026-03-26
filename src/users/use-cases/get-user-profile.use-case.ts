import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findProfileById(userId);

    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }
}
