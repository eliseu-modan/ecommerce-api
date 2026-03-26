import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MailService } from '../services/mail.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { CreateAddressUseCase } from './use-cases/create-address.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetAddressesUseCase } from './use-cases/get-addresses.use-case';
import { GetUserProfileUseCase } from './use-cases/get-user-profile.use-case';
import { RequestPasswordResetUseCase } from './use-cases/request-password-reset.use-case';
import { ResetPasswordUseCase } from './use-cases/reset-password.use-case';
import { UpdateAddressUseCase } from './use-cases/update-address.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersRepository,
    MailService,
    CreateUserUseCase,
    UpdateUserUseCase,
    RequestPasswordResetUseCase,
    ResetPasswordUseCase,
    GetUserProfileUseCase,
    CreateAddressUseCase,
    UpdateAddressUseCase,
    GetAddressesUseCase,
  ],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
