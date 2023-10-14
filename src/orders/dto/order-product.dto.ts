
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateOrderProductInput } from './create-order-product.dto';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class OrderProductInput {
  @IsNotEmpty()
  @IsPositive()
  @Field(() => Int)
  readonly quantity: number


  @IsOptional()
  @IsString()
  @Field(() => String)
  readonly  productRef: string;
}
