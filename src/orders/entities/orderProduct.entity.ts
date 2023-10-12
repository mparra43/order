import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    @Field(() => Number)
    quantity: number;

    @ManyToOne(() => Order, (order) => order.orderProducts)
    @JoinTable({
        name: 'order',
    })
    order: Order;

    @ManyToOne(() => Product, (product) => product)
    @JoinTable({
        name: 'product',
    })
    product: Product;

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

    constructor(quantity: number, order: Order, product: Product) {
        this.quantity = quantity;
        this.order = order;
        this.product = product;
    }
}