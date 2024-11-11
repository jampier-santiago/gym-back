// Dependeincies
import { Module } from '@nestjs/common';

// Services
import { SeedersService } from './seeders.service';

// Controllers
import { SeedersController } from './seeders.controller';

// Modules
import { RolsModule } from 'rols/rols.module';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [RolsModule, UsersModule],
  controllers: [SeedersController],
  providers: [SeedersService],
})
export class SeedersModule {}
