import { OrdersService } from '@/orders/services/order.service';

import { CustomerService, UserService } from '@/users/service';
import { Injectable } from '@nestjs/common';
import { products, orders } from './data';
import { RoleName } from '@/users/types';
import { ProductService } from '@/products/service/products.service';



@Injectable()
export class SeedService {
    constructor(
        private readonly productService: ProductService,
        private readonly ordersService: OrdersService,
        private readonly customersService: CustomerService,
        private readonly usersService: UserService,
    ) { }


    async runSeed() {
        await this.insertDataSeed();
        return 'SEED EXECUTED';
    }

    private async insertDataSeed() {
        await this.productService.deleteAllProducts();
        const insertPromisesProducts = [];
        products.forEach(product => {
            insertPromisesProducts.push(this.productService.create(product));
        });
        await Promise.all(insertPromisesProducts);

        orders.forEach(async ({ name, documentType, documentNumber, email, password, ...res }) => {
            const customer = await this.customersService.create({ name, documentType, document: documentNumber })
            this.usersService.create({ email, password, role: RoleName.CUSTOMER, customerId: customer.id });
            this.ordersService.create({ customerId: customer.id, ...res })
        });
        return true;
    }


}