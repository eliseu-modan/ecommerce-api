import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  totalAmount: string;

  @IsNotEmpty()
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }>;

  @IsNotEmpty()
  payment: Array<{
    method: string;
    status: string;
    amountPaid: number;
    paidAt: Date;
  }>;
}
