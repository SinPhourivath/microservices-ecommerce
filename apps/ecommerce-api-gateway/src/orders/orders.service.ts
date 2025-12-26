import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/contracts/src/orders/order.dto';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_CLIENT') private ordersClient: ClientProxy) { }

  create(createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('orders.create', createOrderDto);
  }

  findAll() {
    return this.ordersClient.send('orders.findAll', {});
  }

  findOne(id: string) {
    return this.ordersClient.send('orders.findOne', id);
  }
}
