import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from '../../orders/entities';
import { User } from './user.entity';

import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
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
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
    documentType: string;

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
    updateAt: Date;


    @DeleteDateColumn({
        type: 'timestamptz',
        name: 'deleted_at',
    })
    deletedAt: Date;

    constructor( name: string, documentType: string, documentNumber: number) {
        this.name = name;
        this.documentType = documentType;
        this.document = documentNumber;
    }
}