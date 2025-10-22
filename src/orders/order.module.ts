import { Module } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { OrdersController } from "./order.controller";
import { OrdersService } from "./order.service";
@Module({
    providers: [OrdersService, PrismaService],
    controllers: [OrdersController],
})

export class OrdersModule {}