import { RootEntity } from '../root-entity';
import db from 'src/configs/firebase.config';
import * as _ from 'lodash';
import { UserRepository } from 'src/repositories/user.repository';
import { StatusUser } from 'src/constants/status-user.enum';
import { RoleUser } from 'src/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Users extends RootEntity {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  status: StatusUser;

  @ApiProperty()
  role: RoleUser;

  @ApiProperty()
  refreshToken?: string;
}

const usersCollection = _.camelCase(Users.name);

export const userRepository = new UserRepository(usersCollection, db);
