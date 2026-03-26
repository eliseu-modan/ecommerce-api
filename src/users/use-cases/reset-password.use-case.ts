import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class ResetPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    if (!token || !newPassword) {
      throw new BadRequestException('Token e nova senha são obrigatórios');
    }

    const passwordReset =
      await this.usersRepository.findPasswordResetByToken(token);

    if (
      !passwordReset ||
      passwordReset.expiresAt < new Date() ||
      passwordReset.used
    ) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersRepository.updateById(passwordReset.userId, {
      password: hashedPassword,
    });
    await this.usersRepository.markPasswordResetAsUsed(passwordReset.id);

    return { message: 'Senha redefinida com sucesso' };
  }
}
