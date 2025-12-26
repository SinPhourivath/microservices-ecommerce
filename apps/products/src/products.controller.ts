import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from '@app/contracts/products';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('products.create')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('products.findAll')
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern('products.findOne')
  findOne(@Payload() id: string) {
    return this.productsService.findOne(id);
  }

  @MessagePattern('products.update')
  update(
    @Payload() payload: { id: string; updateProductDto: UpdateProductDto },
  ) {
    return this.productsService.update(payload.id, payload.updateProductDto);
  }

  @MessagePattern('products.remove')
  remove(@Payload() id: string) {
    return this.productsService.remove(id);
  }
}
