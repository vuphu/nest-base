import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UserService],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
