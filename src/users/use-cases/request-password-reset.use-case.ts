import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailService } from 'src/services/mail.service';
import { RequestPasswordResetDto } from '../dto/request-password-reset.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class RequestPasswordResetUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}

  async execute(requestPasswordResetDto: RequestPasswordResetDto) {
    const { email } = requestPasswordResetDto;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await this.usersRepository.deletePasswordResetsByUserId(user.id);
    await this.usersRepository.createPasswordReset({
      userId: user.id,
      token,
      expiresAt,
      used: false,
    });

    const resetLink = `https://site.com/reset-password?token=${token}`;
    await this.mailService.sendPasswordReset(user.email, resetLink);

    return { message: 'E-mail de recuperação enviado' };
  }
}
