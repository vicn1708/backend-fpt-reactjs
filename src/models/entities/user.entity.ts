import { RootEntity } from '../root-entity';
import db from 'src/configs/firebase.config';
import * as _ from 'lodash';
import { UserRepository } from 'src/repositories/user.repository';
import { StatusUser } from 'src/constants/status-user.enum';
import { RoleUser } from 'src/constants/role.enum';

export class Users extends RootEntity {
  id?: string;

  name: string;

  slug: string;

  email: string;

  password: string;

  avatar: string;

  status: StatusUser;

  role: RoleUser;

  refreshToken?: string;
}

const usersCollection = _.camelCase(Users.name);

export const userRepository = new UserRepository(usersCollection, db);
