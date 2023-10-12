import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from './customer.entity';
import { RoleType } from '../types/index';
import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'text',
        unique: true,
    })
    @Field(() => String)
    email: string;

    @Column({
        type: 'text',
    })
    password: string;

    @Column({
        type: 'enum',
        enum:  RoleType,
        nullable: true,
      })
      @Field(() => String)
    role: string;

    @OneToOne(() => Customer, (customer) => customer.user)
    @Field(() => Customer)
    customer: Customer;
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

    constructor(email: string, password: string, role: string) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}