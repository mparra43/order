
import { Query,  Resolver, } from '@nestjs/graphql';
// import { Order } from './entities/order';
// import { OrderService } from './services/order.service';

@Resolver('orders')
export class OrdersResolver {
//   constructor(private readonly orderService: OrderService) {}

  @Query((() => String))
  async orders(): Promise<string> {
    return `await this.orderService.findAll()`;
  }

  @Query((() => String))
  async order(id: string): Promise<string> {
    return `await this.orderService.findOne(id)`;
  }
}