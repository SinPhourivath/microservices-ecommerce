import { Test, TestingModule } from '@nestjs/testing';
import { EcommerceApiGatewayController } from './ecommerce-api-gateway.controller';
import { EcommerceApiGatewayService } from './ecommerce-api-gateway.service';

describe('EcommerceApiGatewayController', () => {
  let ecommerceApiGatewayController: EcommerceApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EcommerceApiGatewayController],
      providers: [EcommerceApiGatewayService],
    }).compile();

    ecommerceApiGatewayController = app.get<EcommerceApiGatewayController>(
      EcommerceApiGatewayController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ecommerceApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
