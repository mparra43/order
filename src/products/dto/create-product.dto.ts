import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsString()
  @Field(() => String)
  readonly  description: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly price: number;

  @IsNotEmpty()
  @Field(() => String)
  readonly reference: string;
}
