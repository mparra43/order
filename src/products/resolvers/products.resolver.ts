import { Query,  Resolver, } from '@nestjs/graphql';
// import { Order } from './entities/order';
// import { OrderService } from './services/order.service';

@Resolver('products')
export class productsResolver {
//   constructor(private readonly productservice: productservice) {}

  @Query((() => String))
  async products(): Promise<string> {
    return `await this.productservice.findAll()`;
  }

  @Query((() => String))
  async order(id: string): Promise<string> {
    return `await this.productservice.findOne(id)`;
  }
}