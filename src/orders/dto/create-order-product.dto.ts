import { InputType, Field, Int } from '@nestjs/graphql';
import {  IsNotEmpty, IsString, IsUUID, IsPositive, IsOptional } from 'class-validator';


@InputType()
export class CreateOrderProductInput {
  @IsNotEmpty()
  @IsPositive()
  @Field(() => Int)
  readonly quantity: number

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly orderId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly productId: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  readonly  productRef: string;

}
