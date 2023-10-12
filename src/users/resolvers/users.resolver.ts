import { Query,  Resolver, } from '@nestjs/graphql';
// import { Order } from './entities/order';
// import { userservice } from './services/order.service';

@Resolver('users')
export class usersResolver {
//   constructor(private readonly userservice: userservice) {}

  @Query((() => String))
  async users(): Promise<string> {
    return `await this.userservice.findAll()`;
  }

  @Query((() => String))
  async order(id: string): Promise<string> {
    return `await this.userservice.findOne(id)`;
  }
}