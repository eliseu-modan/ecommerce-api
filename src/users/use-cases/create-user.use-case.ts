import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserDto) {
    const { name, email, password, profilePic, role, googleId } = createUserDto;
    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      if (googleId && !existingUser.googleId) {
        return this.usersRepository.updateById(existingUser.id, { googleId });
      }

      return existingUser;
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
      role,
      googleId,
    });
  }
}
