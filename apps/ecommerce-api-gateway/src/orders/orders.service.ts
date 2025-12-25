import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_CLIENT') private ordersClient: ClientProxy) {}

  getHello() {
    return this.ordersClient.send('orders.getHello', {});
  }
}
