import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { UserRepository } from './repositories';
import { UserController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
