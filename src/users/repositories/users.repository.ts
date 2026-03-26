import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data: {
    name: string;
    email: string;
    password: string | null;
    profilePic?: string | null;
    role: string;
    googleId?: string | null;
  }) {
    return this.prisma.user.create({ data });
  }

  updateById(
    id: string,
    data: {
      name?: string;
      email?: string;
      password?: string | null;
      profilePic?: string | null;
      googleId?: string | null;
    },
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  deletePasswordResetsByUserId(userId: string) {
    return this.prisma.passwordReset.deleteMany({
      where: { userId },
    });
  }

  createPasswordReset(data: {
    userId: string;
    token: string;
    expiresAt: Date;
    used: boolean;
  }) {
    return this.prisma.passwordReset.create({ data });
  }

  findPasswordResetByToken(token: string) {
    return this.prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  markPasswordResetAsUsed(id: string) {
    return this.prisma.passwordReset.update({
      where: { id },
      data: { used: true },
    });
  }

  findProfileById(userId: string) {
    return this.prisma.user.findUnique({
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
  }

  findAddressByUserIdAndType(userId: string, type: string) {
    return this.prisma.address.findFirst({
      where: { userId, type: type as never },
    });
  }

  createAddress(data: {
    userId: string;
    type: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    complement?: string;
  }) {
    return this.prisma.address.create({
      data: {
        ...data,
        type: data.type as never,
      },
    });
  }

  findAddressById(id: string) {
    return this.prisma.address.findUnique({
      where: { id },
    });
  }

  updateAddressById(id: string, data: Record<string, unknown>) {
    return this.prisma.address.update({
      where: { id },
      data,
    });
  }

  findAddressesByUserId(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
    });
  }
}
