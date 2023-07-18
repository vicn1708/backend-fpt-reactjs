import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Users, userRepository } from 'src/models/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  async findAll() {
    return await userRepository.findAll().execute();
  }

  async findOne(userId: string): Promise<Users> {
    const user = await userRepository.findById(userId).execute();

    if (!user)
      throw new HttpException('User is not exits', HttpStatus.BAD_REQUEST);

    return user;
  }

  async deleteOne(userId: string) {
    const user = await this.findOne(userId);

    if (!user)
      throw new HttpException('User is not exits', HttpStatus.BAD_REQUEST);

    await userRepository.deleteById(userId);

    const result = {
      message: 'Deleted successfully',
      data: user,
    };

    return result;
  }

  async updateOne(userId: string, body: UpdateUserDto) {
    const isUser = await this.findOne(userId);

    if (!isUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const isData = _.isEmpty(body);

    if (isData)
      throw new HttpException('Malformed data', HttpStatus.BAD_REQUEST);

    const userUpdate = await userRepository.updateById(userId, body);

    const result = {
      message: 'Updated successfully',
      data: userUpdate,
    };

    return result;
  }
}
