import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, User } from './entities';
import { CustomerService, UserService } from './service';

@Module({
    imports: [
      TypeOrmModule.forFeature([
       Customer,
       User
      ]),
    ],
    providers: [CustomerService, UserService],
    exports: [CustomerService, UserService],
  })
   
export class UserModule {}
