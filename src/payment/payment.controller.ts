import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentDto as MakePaymentDto } from './dto/paymentDto';
import { GetPaymentDetailsUseCase } from './use-cases/get-payment-details.use-case';
import { MakePaymentUseCase } from './use-cases/make-payment.use-case';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly makePaymentUseCase: MakePaymentUseCase,
    private readonly getPaymentDetailsUseCase: GetPaymentDetailsUseCase,
  ) {}

  @Post('make-payment')
  @ApiOperation({ summary: 'Realizar um pagamento.' })
  @ApiResponse({ status: 201, description: 'Pagamento realizado com sucesso.' })
  async makePayment(@Body() makePaymentDto: MakePaymentDto, @Res() res) {
    const resp = await this.makePaymentUseCase.execute(makePaymentDto);
    return res.status(201).json(resp);
  }

  @Get('get-payment/:id')
  @ApiOperation({ summary: 'Trazer detalhes sobre Histórico de Pagamento.' })
  @ApiResponse({ status: 200, description: 'Histórico de Pagamentos.' })
  async getPaymentDetails(@Param('id') id: string, @Res() res) {
    const resp = await this.getPaymentDetailsUseCase.execute(id);
    return res.status(200).json(resp);
  }
}
