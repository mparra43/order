import { Module } from '@nestjs/common';
import { Order, OrderProduct } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/order.service';
import { OrdersResolver } from './resolvers/orders.resolver';
import { OrderProductsService } from './services';
import { ProductModule } from '@/products/product.module';
import { UserModule } from '@/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
     Order, 
     OrderProduct
     ]), 
     ProductModule,
     UserModule
  ],
  providers:[OrdersService, OrderProductsService, OrdersResolver],
  exports:[OrdersService, OrderProductsService]
})
export class OrderModule {}
