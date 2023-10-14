import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsDate, IsEnum, IsNotEmpty,  IsOptional,  IsString, IsUUID } from 'class-validator';
import { OrderState } from '../types';
import { OrderProductInput } from './order-product.dto';

@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(OrderState)
  @Field(() => String)
  readonly  state: string;

  @IsOptional()
  @IsArray()
  @Field(() => [OrderProductInput], { nullable: true })
  readonly orderProducts: OrderProductInput[];


  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  readonly estimatedDeliveryDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly customerId: string;
}
