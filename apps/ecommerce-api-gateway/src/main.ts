import { NestFactory } from '@nestjs/core';
import { EcommerceApiGatewayModule } from './ecommerce-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(EcommerceApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
