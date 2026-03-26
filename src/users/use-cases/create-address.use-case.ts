import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateAddressUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dataAddress: CreateAddressDto & { userId: string }) {
    const {
      userId,
      type,
      street,
      number,
      neighborhood,
      city,
      state,
      zipCode,
      country,
      complement,
    } = dataAddress;

    const findAddress = await this.usersRepository.findAddressByUserIdAndType(
      userId,
      type,
    );

    if (findAddress) {
      throw new BadRequestException('Endereço já cadastrado para esse usuário');
    }

    return this.usersRepository.createAddress({
      userId,
      type,
      street,
      number,
      neighborhood,
      city,
      state,
      zipCode,
      country,
      complement,
    });
  }
}
