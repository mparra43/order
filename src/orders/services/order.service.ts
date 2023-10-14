import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities';
import { CreateOrderInput, InputOrderFilters } from '../dto';

import { CustomerService } from '../../users/service/customer.service';
import { OrderProductsService } from './order.product.service';
import { Product } from '../../products/entities/product.entity';



@Injectable()
export class OrdersService {

    private readonly logger = new Logger('OrdersService');

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly orderProductsService: OrderProductsService,
        private readonly customerService: CustomerService
    ) { }

    async create({ orderProducts, customerId, ...res }: CreateOrderInput) {
        try {
            const customer = await this.customerService.findCustomerById(customerId)
            const newOrder = this.orderRepository.create({ customer, ...res });
            const order = await this.orderRepository.save(newOrder);
            await this.orderProductsService.createProductsToOrden(order, orderProducts);
            return order;
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }


    async findOrder({ orderId, document, documentType }: InputOrderFilters): Promise<Order> {
        const order = await this.orderRepository.findOne({
            relations: {
                orderProducts: {
                    product: true,
                    order:true
                },
                customer: {
                    user: true
                }
            },
            where: { id: orderId, customer: { document, documentType } }
        });
        if (!order) {
            throw new Error('order not found');
        }
        return order;
    }



    private handleDBExceptions(error: any) {
        if (error.code === '23505')
            throw new BadRequestException(error.detail);

        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    }

    async deleteAllOrders() {
        const query = this.orderRepository.createQueryBuilder('Order');
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