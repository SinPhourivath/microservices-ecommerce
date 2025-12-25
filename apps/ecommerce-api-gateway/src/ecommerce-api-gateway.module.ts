import { Module } from '@nestjs/common';
import { EcommerceApiGatewayController } from './ecommerce-api-gateway.controller';
import { EcommerceApiGatewayService } from './ecommerce-api-gateway.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule],
  controllers: [EcommerceApiGatewayController],
  providers: [EcommerceApiGatewayService],
})
export class EcommerceApiGatewayModule {}
