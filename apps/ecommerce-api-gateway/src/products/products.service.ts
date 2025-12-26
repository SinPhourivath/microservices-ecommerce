import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@app/contracts/src/products/product.dto';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCTS_CLIENT') private productsClient: ClientProxy) {}

  create(createProductDto: CreateProductDto) {
    return this.productsClient.send('products.create', createProductDto);
  }

  findAll() {
    return this.productsClient.send('products.findAll', {});
  }

  findOne(id: string) {
    return this.productsClient.send('products.findOne', id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsClient.send('products.update', {
      id,
      updateProductDto,
    });
  }

  remove(id: string) {
    return this.productsClient.send('products.remove', id);
  }
}
