import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '../../repositories/user.repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
