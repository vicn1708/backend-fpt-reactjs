import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';
import { userRepository } from 'src/models/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async create(createUser: CreateUserDto) {
    const isUser = await this.findOne(createUser.username);

    if (isUser)
      throw new HttpException('User đã tồn tại', HttpStatus.BAD_REQUEST);

    if (createUser.password !== createUser.enterPassword)
      throw new HttpException(
        'Pasword không trùng khớp',
        HttpStatus.BAD_REQUEST,
      );

    const user = await userRepository.create({
      username: createUser.username,
      password: createUser.password,
      avatar: null,
    });

    return user;
  }

  async findOne(username: string) {
    const user = await userRepository
      .find({
        field: 'username',
        value: username,
      })
      .execute();

    return user;
  }

  async updateOne(userId: string, payload: UpdateUserDto) {
    const isUser = await userRepository.findById(userId).execute();

    if (!isUser)
      throw new HttpException('User không tồn tại', HttpStatus.BAD_REQUEST);

    const update = await userRepository.updateById(userId, payload);

    return update;
  }
}
