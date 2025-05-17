// update-address.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
