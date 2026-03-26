import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(updateUserData) {
    const { name, email, password, profilePic, id } = updateUserData;
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    return this.usersRepository.updateById(id, {
      name,
      email,
      password: hashedPassword,
      profilePic,
    });
  }
}
