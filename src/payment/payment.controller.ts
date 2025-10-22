import { Controller, Get, Param, Res, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { PaymentDto as MakePaymentDto } from './dto/paymentDto';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('make-payment')
    @ApiOperation({ summary: 'Realizar um pagamento.' })
    @ApiResponse({ status: 201, description: 'Pagamento realizado com sucesso.' })
    async makePayment(@Body() makePaymentDto: MakePaymentDto, @Res() res) {
      const resp = await this.paymentService.makePayment(makePaymentDto);
      return res.status(201).json(resp);
    }

  @Get('get-payment/:id')
  @ApiOperation({ summary: 'Trazer detalhes sobre Histórico de Pagamento.' })
  @ApiResponse({ status: 200, description: 'Histórico de Pagamentos.' })
  async getPaymentDetails(@Param('id') id: string, @Res() res) {
    const resp = await this.paymentService.getPaymentDetails(id);
    return res.status(200).json(resp);
  }
}
