import { Module } from '@nestjs/common';
import { EcommerceApiGatewayController } from './ecommerce-api-gateway.controller';
import { EcommerceApiGatewayService } from './ecommerce-api-gateway.service';

@Module({
  imports: [],
  controllers: [EcommerceApiGatewayController],
  providers: [EcommerceApiGatewayService],
})
export class EcommerceApiGatewayModule {}
