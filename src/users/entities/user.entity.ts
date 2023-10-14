import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from './customer.entity';
import { RoleName } from '../types/index';
import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
        enum:  RoleName,
        nullable: true,
      })
      @Field(() => String)
    role: string;

    @OneToOne(() => Customer, (customer) => customer.user)
    @Field(() => Customer)
    customer: Customer;


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

    constructor(email: string, password: string, role: string) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}