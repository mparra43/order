import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities';
import { CreateCustomerInput } from '../dto';


@Injectable()
export class CustomerService {

    private readonly logger = new Logger('CustomersService');

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) { }



    async create(createCustomerDto: CreateCustomerInput) {
        try {
            const customerExists = await this.customerRepository.findOne({
                where: {
                    document: createCustomerDto.document,
                }
            });

            if (customerExists) {
                throw new Error('Customer already exists');
            }

            const newCustomer = this.customerRepository.create(createCustomerDto);
            return await this.customerRepository.save(newCustomer);
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }


    async findCustomerById(id: string): Promise<Customer> {
        const product = await this.customerRepository.findOne({
            where: { id }
        });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    private handleDBExceptions(error: any) {

        if (error.code === '23505')
            throw new BadRequestException(error.detail);

        this.logger.error(error)

        throw new InternalServerErrorException('Unexpected error, check server logs');

    }

    async deleteAllCustomers() {
        const query = this.customerRepository.createQueryBuilder('Customer');

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