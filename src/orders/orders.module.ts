import { Module } from '@nestjs/common';
import { OrdersResolver } from './resolvers/orders.resolver';

@Module({
    imports: [
    ],
    providers: [OrdersResolver],
    exports: [],
  })
export class OrdersModule {}
