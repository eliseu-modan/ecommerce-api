import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { CreateAddressDto } from './dto/create-address';
import { UpdateAddressDto } from './dto/update-addres';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../services/mail.service';

import * as crypto from 'crypto';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, profilePic, role, googleId } = createUserDto;

    let existingUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      if (googleId && !existingUser.googleId) {
        return this.prisma.user.update({
          where: { email },
          data: { googleId },
        });
      }
      return existingUser;
    }

    let hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePic,
        role,
        googleId,
      },
    });
  }

  async updateUser(updateUserData) {
    const { name, email, password, profilePic, id } = updateUserData;

    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    let hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    return this.prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        password: hashedPassword,
        profilePic,
      },
    });
  }

  async requestPasswordReset(RequestPasswordResetDto: RequestPasswordResetDto) {
    const { email } = RequestPasswordResetDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await this.prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    });

    await this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
        used: false,
      },
    });
    console.log(email, token);
    
    const resetLink = `https://seusite.com/reset-password?token=${token}`;
    await this.mailService.sendPasswordReset(user.email, resetLink);

    return { message: 'E-mail de recuperação enviado' };
  }

  async resetPassword(ResetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = ResetPasswordDto;
    if (!token || !newPassword) {
      throw new BadRequestException('Token e nova senha são obrigatórios');
    }

    const passwordReset = await this.prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true },
    });

    if (
      !passwordReset ||
      passwordReset.expiresAt < new Date() ||
      passwordReset.used
    ) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: passwordReset.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { used: true },
    });

    return { message: 'Senha redefinida com sucesso' };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
        role: true,
        googleId: true,
        facebookId: true,
      },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async createAddress(dataAddress: CreateAddressDto & { userId: string }) {
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

    const findAddress = await this.prisma.address.findFirst({
      where: { userId, type },
    });

    if (findAddress) {
      throw new BadRequestException('Endereço já cadastrado para esse usuário');
    }

    const address = await this.prisma.address.create({
      data: {
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
      },
    });
    return address;
  }

  async updateAddress(
    id: string,
    userId: string,
    updateAddressDto: UpdateAddressDto,
  ) {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!address || address.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este endereço.',
      );
    }

    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async getAddresses(userId: string) {
    const addresses = await this.prisma.address.findMany({
      where: { userId },
    });
    if (!addresses) throw new NotFoundException('Endereços não encontrados');
    return addresses;
  }
}
