import { DocumentType } from '../../users/types';
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString, IsPositive, IsUUID } from 'class-validator';


@InputType()
export class InputOrderFilters {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @Field(() => String, { nullable: true })
    readonly orderId: string;


    @IsNotEmpty()
    @IsEnum(DocumentType)
    @Field(() => String, { nullable: true })
    readonly documentType: string;

    @IsNotEmpty()
    @IsPositive()
    @Field(() => Int, { nullable: true })
    readonly document: number;


}