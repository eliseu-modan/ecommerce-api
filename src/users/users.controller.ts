import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAddressDto } from './dto/create-address';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateAddressDto } from './dto/update-addres';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuario criado com sucesso.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('update-user')
  @ApiOperation({ summary: 'Atualizar Usuário' })
  @ApiResponse({ status: 200, description: 'Usuario Atualizado com sucesso.' })
  @UseGuards(JwtAuthGuard)
  async updateUser(@Req() req, @Body() updateUserDto: CreateUserDto) {
    const updateUserData = {
      ...updateUserDto,
      id: req.user.userId,
    };
    return this.usersService.updateUser(updateUserData);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar Redefinição de senha por Email' })
  @ApiResponse({ status: 200, description: 'Solicitação Enviada com sucesso.' })
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.usersService.requestPasswordReset(requestPasswordResetDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Redefinir Senha' })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso.' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-profile')
  @ApiOperation({ summary: 'Obter Perfil do Usuário' })
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário obtido com sucesso.',
  })
  async getUserProfile(@Req() req) {
    const userId = req.user.userId;
    return this.usersService.getUserProfile(userId);
  }

  @Post('add-address')
  @ApiOperation({ summary: 'Adicionar Endereço' })
  @ApiResponse({
    status: 200,
    description: 'Endereço adicionado com sucesso .',
  })
  @UseGuards(JwtAuthGuard)
  async addAddress(@Req() req, @Body() createAddressDto: CreateAddressDto) {
    const dataAddres = { userId: req.user.userId, ...createAddressDto };
    return this.usersService.createAddress(dataAddres);
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
    return this.usersService.updateAddress(
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
    return this.usersService.getAddresses(req.user.userId);
  }
}
