import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty,  IsString, IsUUID } from 'class-validator';
import { RoleName } from '../types';

@InputType()
export class CreateUserInput {

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(RoleName)
  @Field(() => String)
  readonly role: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly customerId: string;
}
