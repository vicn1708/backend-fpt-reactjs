import { RootEntity } from '../root-entity';
import db from 'src/configs/firebase.config';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { StorageRepository } from 'src/repositories/storage.repository';

export class Storages extends RootEntity {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  imageId: string;
}

const storageCollection = _.camelCase(Storages.name);

export const storageRepository = new StorageRepository(storageCollection, db);
