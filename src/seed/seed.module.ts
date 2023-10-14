import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ProductModule } from '@/products/product.module';
import { OrderModule } from '@/orders/order.module';
import { UserModule } from '@/users/user.module';

@Module({
    imports: [
        ProductModule,
        OrderModule,
        UserModule
    ],
    providers: [SeedService, SeedResolver],
})
export class SeedModule {}