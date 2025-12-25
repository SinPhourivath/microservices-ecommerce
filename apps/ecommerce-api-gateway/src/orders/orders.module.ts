import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.ORDERS_SERVICE_HOST,
          port: Number(process.env.ORDERS_SERVICE_PORT),
        },
      },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
