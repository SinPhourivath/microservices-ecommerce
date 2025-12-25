import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCTS_CLIENT') private productsClient: ClientProxy) {}

  getHello() {
    return this.productsClient.send('products.getHello', {});
  }
}
