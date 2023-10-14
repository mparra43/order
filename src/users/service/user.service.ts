import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { CreateUserInput } from '../dto';
import { CustomerService } from './customer.service';


@Injectable()
export class UserService {

    private readonly logger = new Logger('UsersService');

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly customerService: CustomerService,
    ) { }



    async create({ customerId, ...res }: CreateUserInput) {
        try {
            const userExists = await this.userRepository.findOne({
                where: {
                    email: res.email,
                }
            });

            if (userExists) {
                throw new Error('user already exists');
            }

            const customer = await this.customerService.findCustomerById(customerId);
            const newUser = this.userRepository.create({ customer, ...res });
            return await this.userRepository.save(newUser);

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

    async deleteAllUsers() {
        const query = this.userRepository.createQueryBuilder('user');

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