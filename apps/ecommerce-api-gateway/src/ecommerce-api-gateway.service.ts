import { Injectable } from '@nestjs/common';

@Injectable()
export class EcommerceApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
