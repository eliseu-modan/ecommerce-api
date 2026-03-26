import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateAddressDto } from '../dto/update-addres';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UpdateAddressUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    id: string,
    userId: string,
    updateAddressDto: UpdateAddressDto,
  ) {
    const address = await this.usersRepository.findAddressById(id);

    if (!address || address.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este endereço.',
      );
    }

    return this.usersRepository.updateAddressById(
      id,
      updateAddressDto as Record<string, unknown>,
    );
  }
}
