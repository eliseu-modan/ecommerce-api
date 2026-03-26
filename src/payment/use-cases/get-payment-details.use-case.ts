import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment.repository';

@Injectable()
export class GetPaymentDetailsUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(id: string) {
    return this.paymentRepository.findByOrderId(id);
  }
}
