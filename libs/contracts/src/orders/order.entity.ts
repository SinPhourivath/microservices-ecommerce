import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  orderId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
