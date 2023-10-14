import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities';
import { CreateProductInput } from '../dto';


@Injectable()
export class ProductService {

    private readonly logger = new Logger('ProductsService');

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }



    async create(createProductDto: CreateProductInput) {
        try {
            const productExists = await this.productRepository.findOne({
                where: {
                    name: createProductDto.name,
                }
            });

            if (productExists) {
                throw new Error('Product already exists');
            }

            const newProduct = this.productRepository.create(createProductDto);
            return await this.productRepository.save(newProduct);
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }


    async findProductByReference(reference: string): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { reference: reference }
        });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }


    async findProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({
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

    async deleteAllProducts() {
        const query = this.productRepository.createQueryBuilder('product');

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