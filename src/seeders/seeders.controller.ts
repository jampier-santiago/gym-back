import { Controller, Get } from '@nestjs/common';
import { SeedersService } from './seeders.service';

@Controller('seeders')
export class SeedersController {
  constructor(private readonly seedersService: SeedersService) {}

  @Get()
  runSeeders() {
    return this.seedersService.runSeeders();
  }
}
