import { Query,  Resolver, } from '@nestjs/graphql';
import { SeedService } from './seed.service';


@Resolver('seeds')
export class SeedResolver {
 constructor(private readonly seedService: SeedService) {}

  @Query((() => String))
  async executeSeed() {
    return await this.seedService.runSeed()
  }

  
}