import { Injectable } from '@nestjs/common';
import { JwtTokenService } from 'src/lib/jwt/jwt-token.service';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class HandleGoogleLoginUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(googleUser: any) {
    let user = await this.usersRepository.findByEmail(googleUser.email);

    if (!user) {
      user = await this.usersRepository.create({
        name: googleUser.name,
        email: googleUser.email,
        password: null,
        profilePic: googleUser.profilePhoto,
        googleId: googleUser.googleId,
        role: 'USER',
      });
    }

    const token = this.jwtTokenService.sign(
      this.jwtTokenService.buildPayload(user),
    );

    return { token, user };
  }
}
