import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/contracts/orders';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_CLIENT') private ordersClient: ClientProxy) {}

  create(createOrderDto: CreateOrderDto, userId: string) {
    return firstValueFrom(
      this.ordersClient.send('orders.create', { ...createOrderDto, userId }),
    );
  }

  findAll() {
    return this.ordersClient.send('orders.findAll', {});
  }

  findOne(id: string) {
    return this.ordersClient.send('orders.findOne', id);
  }
}
