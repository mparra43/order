import { Module } from '@nestjs/common';
import { productsResolver } from './resolvers/products.resolver';

@Module({
    imports: [
    ],
    providers: [productsResolver],
    exports: [],
  })
export class ProductsModule {}
