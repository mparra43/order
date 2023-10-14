import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderProduct } from '../entities';
import { CreateOrderInput, CreateOrderProductInput, OrderProductInput } from '../dto';
import { ProductService } from '@/products/service/products.service';
import { Product } from '@/products/entities';





@Injectable()
export class OrderProductsService {

    private readonly logger = new Logger('OrdersService');

    constructor(
        @InjectRepository(OrderProduct)
        private readonly orderProductRepository: Repository<OrderProduct>,
        private readonly productService: ProductService

    ) { }

    async createProductToOrden(productRef: string, quantity: number, order: Order) {
        try {
            const product = await this.productService.findProductByReference(productRef);
            const newProductToOrden = this.orderProductRepository.create({ product, quantity, order })
            return await this.orderProductRepository.save(newProductToOrden);
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }



    async createProductsToOrden(order: Order, orderProducts: OrderProductInput[]) {
        try {
            orderProducts.forEach(({ productRef, quantity }) => {
                this.createProductToOrden(productRef, quantity, order)
            });
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }


    private handleDBExceptions(error: any) {
        if (error.code === '23505')
            throw new BadRequestException(error.detail);

        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    }

    async deleteAllOrders() {
        const query = this.orderProductRepository.createQueryBuilder('Order');
        try {
            return await query
                .delete()
                .where({})
                .execute();

        } catch (error) {
            this.handleDBExceptions(error);
        }
    }
}