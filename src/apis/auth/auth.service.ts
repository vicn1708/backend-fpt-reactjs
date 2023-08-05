import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { HashingProvider } from 'src/utils/hashing.provider';
import * as _ from 'lodash';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingProvider,
    private readonly userService: UserService,
  ) {}

  async register(createUser: CreateUserDto) {
    const user = await this.userService.create(createUser);

    return user;
  }

  async login(userInfo: Omit<CreateUserDto, 'enterPassword' | 'avatar'>) {
    const user = await this.userService.findOne(userInfo.username);

    if (!user)
      throw new HttpException('User không tồn tại', HttpStatus.BAD_REQUEST);

    if (userInfo.password !== user.password)
      throw new HttpException(
        'Mật khẩu không trùng khớp',
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }
}
