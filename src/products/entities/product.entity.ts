import { Field, ObjectType } from '@nestjs/graphql';
import { OrderProduct } from 'src/orders/entities';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';


@ObjectType()
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    @Field(() => String)
    name: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    @Field(() => String)
    description: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    @Field(() => Number)
    price: number;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
    @Field(() => [OrderProduct])
    orderProducts: OrderProduct[];

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

    constructor(name: string, description: string, price: number) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
}