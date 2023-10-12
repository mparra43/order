import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { User } from './user.entity';

import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { DocumentType } from '../types';

@ObjectType()
@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    @Field(() => String)
    name: string;

    @Column({
        type: 'enum',
        enum: DocumentType,
        nullable: true,
    })
    @Field(() => String, { nullable: true })
    typeDocument: string;

    @Column({
        type: 'int',
        unique: true,
        nullable: true,
    })
    @Field(() => Number, { nullable: true })
    document: number;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @OneToOne(() => User, (User) => User.customer)
    @JoinColumn({
        name: 'User_id',
    })
    @Field(() => User)
    user: User;

    @Column({
        type: 'timestamptz',
        name: 'date',
    })
    @Field(() => Date)
    date: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    constructor( name: string, typeDocument: string, documentNumber: number) {
        this.name = name;
        this.typeDocument = typeDocument;
        this.document = documentNumber;
    }
}