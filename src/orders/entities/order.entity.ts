import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderProduct } from './orderProduct.entity';
import { Customer } from '../../users/entities';
import { OrderState } from '../types';
import { string } from 'joi';

@ObjectType()
@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    @Field(() => String)
    address: string;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    @Field(() => [OrderProduct])
    orderProducts: OrderProduct[];

    @OneToOne(() => Customer, (customer) => customer.orders)
    @JoinColumn({
        name: 'customer_id',
    })
    @Field(() => Customer)
    customer: Customer;

    @Column({
        type: 'date',
        name: 'estimatedDeliveryDate',
        nullable: false
    })
    @Field(() => String)
    estimatedDeliveryDate: Date;

    @Column({
        type: 'enum',
        enum: OrderState,
        default: null,
    })
    @Field(() => String)
    state: string;

    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;


    @DeleteDateColumn({
        type: 'timestamptz',
        name: 'deleted_at',
    })
    deletedAt: Date;

    constructor(address: string, customer: Customer, estimatedDeliveryDate: Date, state: OrderState) {
        this.address = address;
        this.customer = customer;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        this.state = state;
    }
}