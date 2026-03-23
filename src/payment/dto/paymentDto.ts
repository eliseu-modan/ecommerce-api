import { IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  orderId: string;
}
