import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Users, userRepository } from 'src/models/entities/user.entity';

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
}
