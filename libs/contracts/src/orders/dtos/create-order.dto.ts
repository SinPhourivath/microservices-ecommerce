import { IsArray, IsNumber, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDto } from './order.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  items: OrderDto[];

  @IsNumber()
  @Min(0)
  totalAmount: number;
}
