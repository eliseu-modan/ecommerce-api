import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateAddressDto } from './dto/create-address';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateAddressDto } from './dto/update-addres';
import { CreateAddressUseCase } from './use-cases/create-address.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetAddressesUseCase } from './use-cases/get-addresses.use-case';
import { GetUserProfileUseCase } from './use-cases/get-user-profile.use-case';
import { RequestPasswordResetUseCase } from './use-cases/request-password-reset.use-case';
import { ResetPasswordUseCase } from './use-cases/reset-password.use-case';
import { UpdateAddressUseCase } from './use-cases/update-address.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly updateAddressUseCase: UpdateAddressUseCase,
    private readonly getAddressesUseCase: GetAddressesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuario criado com sucesso.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Patch('update-user')
  @ApiOperation({ summary: 'Atualizar Usuário' })
  @ApiResponse({ status: 200, description: 'Usuario Atualizado com sucesso.' })
  @UseGuards(JwtAuthGuard)
  async updateUser(@Req() req, @Body() updateUserDto: CreateUserDto) {
    return this.updateUserUseCase.execute({
      ...updateUserDto,
      id: req.user.userId,
    });
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar Redefinição de senha por Email' })
  @ApiResponse({ status: 200, description: 'Solicitação Enviada com sucesso.' })
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.requestPasswordResetUseCase.execute(requestPasswordResetDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Redefinir Senha' })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso.' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-profile')
  @ApiOperation({ summary: 'Obter Perfil do Usuário' })
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário obtido com sucesso.',
  })
  async getUserProfile(@Req() req) {
    return this.getUserProfileUseCase.execute(req.user.userId);
  }

  @Post('add-address')
  @ApiOperation({ summary: 'Adicionar Endereço' })
  @ApiResponse({
    status: 200,
    description: 'Endereço adicionado com sucesso .',
  })
  @UseGuards(JwtAuthGuard)
  async addAddress(@Req() req, @Body() createAddressDto: CreateAddressDto) {
    return this.createAddressUseCase.execute({
      userId: req.user.userId,
      ...createAddressDto,
    });
  }

  @Patch('update-address/:id')
  @ApiOperation({ summary: 'Atualizar Endereço' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @UseGuards(JwtAuthGuard)
  async updateAddress(
    @Param('id') id: string,
    @Req() req,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.updateAddressUseCase.execute(
      id,
      req.user.userId,
      updateAddressDto,
    );
  }

  @Get('addresses')
  @ApiOperation({ summary: 'Obter Endereços do Usuário' })
  @ApiResponse({ status: 200, description: 'Endereços obtidos com sucesso.' })
  @UseGuards(JwtAuthGuard)
  async getAddresses(@Req() req) {
    return this.getAddressesUseCase.execute(req.user.userId);
  }
}
