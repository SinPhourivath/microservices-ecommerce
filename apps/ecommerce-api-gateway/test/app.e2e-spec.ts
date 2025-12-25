import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { EcommerceApiGatewayModule } from './../src/ecommerce-api-gateway.module';
import { Server } from 'http';

describe('EcommerceApiGatewayController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EcommerceApiGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer() as Server)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
