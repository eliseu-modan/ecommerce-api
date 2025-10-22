import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async paymentConfirmation(to: string, orderId: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Confirmação de Pagamento',
      text: `Seu pagamento para o pedido ${orderId} foi confirmado com sucesso!`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordReset(to: string, resetLink: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Redefinição de Senha',
      text: `Clique no link para redefinir sua senha: ${resetLink}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
