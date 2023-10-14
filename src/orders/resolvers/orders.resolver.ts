
import { Args, Query,  Resolver, } from '@nestjs/graphql';
import { OrdersService } from '../services';
import { Order } from '../entities';
import { InputOrderFilters } from '../dto';


@Resolver('orders')
export class OrdersResolver {
 constructor(private readonly orderService: OrdersService) {}

  @Query((() => Order))
  async order(@Args('filters') filters:InputOrderFilters) {
    return this.orderService.findOrder(filters);
  }

  
}