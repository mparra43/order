import { Module } from '@nestjs/common';
import { usersResolver } from './resolvers/users.resolver';

@Module({
    imports: [
    ],
    providers: [usersResolver],
    exports: [],
  })
   
export class UsersModule {}
