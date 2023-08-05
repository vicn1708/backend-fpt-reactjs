import { RootEntity } from '../root-entity';
import db from 'src/configs/firebase.config';
import * as _ from 'lodash';
import { UserRepository } from 'src/repositories/user.repository';
import { ApiProperty } from '@nestjs/swagger';

export class Users extends RootEntity {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  avatar: string;
}

const usersCollection = _.camelCase(Users.name);

export const userRepository = new UserRepository(usersCollection, db);
