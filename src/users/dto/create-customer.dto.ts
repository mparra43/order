import { InputType, Field, Int } from '@nestjs/graphql';
import {  IsEnum, IsNotEmpty, IsString,  IsPositive } from 'class-validator';
import { DocumentType,  } from '../types';

@InputType()
export class CreateCustomerInput {

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly name: string;


  @IsNotEmpty()
  @IsEnum(DocumentType)
  @Field(() => DocumentType)
  readonly documentType: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Int)
  readonly document: number;

  
}
