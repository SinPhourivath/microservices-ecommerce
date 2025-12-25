import { Controller, Get } from '@nestjs/common';
import { EcommerceApiGatewayService } from './ecommerce-api-gateway.service';

@Controller()
export class EcommerceApiGatewayController {
  constructor(private readonly ecommerceApiGatewayService: EcommerceApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.ecommerceApiGatewayService.getHello();
  }
}
