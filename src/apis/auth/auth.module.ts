import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from 'src/utils/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashingProvider, JwtService, UserService],
})
export class AuthModule {}
