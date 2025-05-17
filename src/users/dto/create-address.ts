// dto/create-address.dto.ts

import { IsString, IsEnum, IsOptional } from 'class-validator';
import { AddressType } from '@prisma/client'; // Enum criado no Prisma (DELIVERY ou BILLING)

export class CreateAddressDto {
  @IsEnum(AddressType)
  type: AddressType;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  complement?: string;
}
