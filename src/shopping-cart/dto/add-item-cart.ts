import { IsNotEmpty } from 'class-validator';


export class AddItemCartDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  quantity: number;
}