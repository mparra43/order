import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';


import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as Joi from 'joi';
import config from './config';
import { DatabasePostgresModule } from './database/postgres.module';
import { SeedModule } from './seed/seed.module';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: true,
    driver: ApolloDriver,
    autoTransformHttpErrors: true,
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [config],
    validationSchema: Joi.object({
      DB_TYPE: Joi.string().required(),
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      JWT_SECRET: Joi.string().required(),
    }),
  }),

    DatabasePostgresModule,
    ProductModule,
    OrderModule,
    UserModule,
    SeedModule
  ],
  controllers: [AppController],

})
export class AppModule { }
