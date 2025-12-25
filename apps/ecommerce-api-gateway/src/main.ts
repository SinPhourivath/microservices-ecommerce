import { NestFactory } from '@nestjs/core';
import { EcommerceApiGatewayModule } from './ecommerce-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(EcommerceApiGatewayModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
