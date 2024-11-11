// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { RolsService } from './rols.service';

// Controllers
import { RolsController } from './rols.controller';

// Entities
import { Rol } from './entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  controllers: [RolsController],
  providers: [RolsService],
  exports: [RolsService, TypeOrmModule],
})
export class RolsModule {}
