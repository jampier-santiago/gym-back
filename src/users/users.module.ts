// Dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { UsersService } from './users.service';

// Controllers
import { UsersController } from './users.controller';

// Entities
import { User } from './entities/user.entity';

// Modules
import { RolsModule } from 'rols/rols.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolsModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'S#cr33T',
        signOptions: { expiresIn: '2h' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
